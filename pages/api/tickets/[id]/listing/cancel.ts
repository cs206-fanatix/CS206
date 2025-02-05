/**
 * This API cancels the current active listing for a ticket
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

        if (ticket == null) {
          throw Error("Ticket cannot be found.");
        }

        const existingActiveListings = await prisma.listing.findMany({
          where: {
            ticketId: ticket.id,
            status: "active",
          },
        });

        if (existingActiveListings.length == 0) {
          throw Error("No existing active listing.");
        }

        const updatedTicket = await prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            status: "sold",
            listings: {
              update: {
                where: {
                  createdAt_ticketId: {
                    createdAt: existingActiveListings[0].createdAt,
                    ticketId: ticket.id,
                  },
                },
                data: {
                  status: "cancelled",
                },
              },
            },
          },
          include: {
            listings: true,
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
