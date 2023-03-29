import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db-client";
import solana from '../../../utils/solana/solana';
import {MintNftEvent} from './types/MintNftEvent';

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
        const events = await prisma.event.findUnique({
          where: {
            id: id as string,
          },
          include: {
            tickets: true,
          },
        });

        if (!events) {
          res.status(400).json('Event not found');
        }

        const mintEvent: MintNftEvent = {
          collectionAddress: events?.mintAddress as string,
          recipient: body.recipient,
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
