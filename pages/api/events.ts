import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db-client";

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
        const event = await prisma.event.create({
          data: {
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
