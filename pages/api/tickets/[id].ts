import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const user = await prisma.ticket.findUnique({
          where: {
            id: id as string,
          },
          include: {
            event: true,
            owner: true,
            listings: {
              include: {
                bids: true,
              },
            },
          },
        });
        res.status(200).json(user);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
