import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db-client";

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
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
