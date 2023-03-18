import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utils/db-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;
  const { id } = req.query;

  switch (method) {
    case "POST":
      try {
        const ticket = await prisma.ticket.findUnique({
          where: { id: id as string },
        });
        const newOwner = await prisma.user.findUnique({
          where: { id: req.body.newOwnerId },
        });

        if (ticket?.status === "unsold") {
          throw Error("Ticket cannot be transferred as it is unsold.");
        }

        if (newOwner == null) {
          throw Error("Owner cannot be found.");
        }

        const updatedTicket = await prisma.ticket.update({
          where: {
            id: ticket?.id,
          },
          data: {
            ownerId: newOwner.id,
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
