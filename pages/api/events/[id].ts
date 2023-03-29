import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db-client";
import solana from '../../../utils/solana/solana';
import {MintingEvent } from './types/MintNftEvent';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const events = await prisma.event.findUnique({
          where: {
            id: id as string,
          },
          include: {
            tickets: true,
          },
        });
        res.status(200).json(events);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;

    case 'POST':
      try {
        const event = await prisma.event.findUnique({
          where: {
            id: id as string,
          },
          include: {
            tickets: true,
          },
        });

        if (!event) {
          res.status(400).json('Event not found');
        }

        const creators = event?.creators as { creatorAddress: string; share: number; }[];
        for (const creator of creators) {
          creator.share = creator.share / 100;
        }

        const mintEvent: MintingEvent = {
          mintPrice: 1,
          minter: body.minter,
          ticketDetails: {
            attributes: event?.attributes as { trait_type: string, value: string }[],
            collectionAddress: event?.mintAddress as string,
            creators,
            ticketDescription:  event?.description as string,
            ticketImage: event?.imageUrl as string,
            ticketName: event?.name as string,
            ticketRoyalties: 500,
            ticketSymbol: event?.symbol as string,
          }
        };

        const mintedNft = await solana.mint(mintEvent);

        res.status(200).json({mintedNft});
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
