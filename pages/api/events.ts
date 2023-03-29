import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db-client";
import solana from '../../utils/solana/solana';
import {CreateCollectionEvent} from './events/types/CreateCollectionEvent';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;

  switch (method) {
    case "GET":
      const events = await prisma.event.findMany();
      res.status(200).json(events);
      break;
    case "POST":
      try {
        const cce: CreateCollectionEvent = {
          collectionDetails: {
            attributes: [{ trait_type: 'venue', value: body.venue }, { trait_type: 'datetime', value: body.eventDateTime.toString() }],
            collectionDescription: '',
            collectionImage: body.imageUrl,
            collectionName: body.name,
            collectionRoyalties: 5,
            collectionSymbol: body.symbol,
            creators: [{creatorAddress: '9qhAuGAn4Jb9z5MaayfJsTNxB26n63qVA74v1k37mFPk', share: 10000}]
          }
        };

        const eventNft = await solana.createCollection(cce);
        const mintAddress = eventNft.address.toString();

        const event = await prisma.event.create({
          data: {
            mintAddress,
            name: body.name,
            artist: body.artist,
            imageUrl: body.imageUrl,
            eventDateTime: new Date(body.eventDateTime),
            venue: body.venue,
          },
        });
        res.status(200).json({
          event,
        });
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
