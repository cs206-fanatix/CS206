/**
 * This API creates a new listing for a ticket
 */

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utils/db-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id } = req.query;

  switch (method) {
    case "PUT":
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
          throw Error("No active listing found to update.");
        }
        const updatedListing = await prisma.listing.update({
          where: {
            createdAt_ticketId: {
              createdAt: existingActiveListings[0].createdAt,
              ticketId: ticket.id,
            },
          },
          data: {
            price: body.price,
          },
        });
        res.status(200).json({
          updatedListing,
        });
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;

    case "POST":
      try {
        const ticket = await prisma.ticket.findUnique({
          where: { id: id as string },
        });
        if (ticket == null) {
          throw Error("Ticket cannot be found.");
        }
        if (ticket?.status === "unsold" || ticket?.ownerId == null) {
          throw Error("Ticket cannot be listed as it is unsold.");
        }

        const existingActiveListings = await prisma.listing.findMany({
          where: {
            ticketId: ticket.id,
            status: "active",
          },
        });

        if (existingActiveListings.length > 0) {
          throw Error("Ticket cannot be listed as it is already listed.");
        }

        const listing = await prisma.listing.create({
          data: {
            createdAt: new Date(),
            ticketId: ticket.id,
            price: body.price,
            status: "active",
            buyerUserId: null,
            sellerUserId: ticket.ownerId,
          },
        });

        await prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            status: "listed",
          },
        });

        res.status(200).json({
          listing,
        });
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
