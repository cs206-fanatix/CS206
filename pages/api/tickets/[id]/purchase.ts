import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;
  const { id } = req.query;

  switch (method) {
    case "POST":
      try {
        const prisma = new PrismaClient();
        const ticket = await prisma.ticket.findUnique({
          where: { id: id as string },
        });
        const owner = await prisma.user.findUnique({
          where: { id: req.body.ownerId },
        });

        if (ticket?.status !== "unsold") {
          throw Error("Ticket cannot be purchased, already sold.");
        }

        if (owner == null) {
          throw Error("Owner cannot be found.");
        }

        const updatedTicket = await prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            ownerId: body.ownerId,
            status: "sold",
          },
        });

        res.status(200).json({
          updatedTicket,
        });
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
