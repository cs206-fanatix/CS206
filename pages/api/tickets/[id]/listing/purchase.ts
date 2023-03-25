/**
 * This API purchases the currently listed ticket
 */

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../utils/db-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;
  const { id } = query;

  switch (method) {
    case "POST":
      try {
        const ticket = await prisma.ticket.findUnique({
          where: { id: id as string },
        });
        const buyer = await prisma.user.findUnique({
          where: { id: body.buyer },
        });
        const seller = await prisma.user.findUnique({
          where: { id: body.seller },
        });

        if (ticket?.status !== "listed") {
          throw Error("Ticket cannot be purchased, not listed.");
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
