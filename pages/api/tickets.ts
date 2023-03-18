import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;

  switch (method) {
    case "GET":
      try {
        const tickets = await prisma.ticket.findMany();
        res.status(200).json(tickets);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    case "POST":
      try {
        if (
          !(
            body.status === "unsold" ||
            body.status === "sold" ||
            body.status === "listed"
          )
        ) {
          throw Error("Status must be unsold, sold or listed.");
        }
        const ticket = await prisma.ticket.create({
          data: {
            eventId: body.eventId,
            level: body.level,
            category: body.category,
            seatNo: body.seatNo,
            price: body.price,
            status: body.status,
          },
        });
        res.status(200).json({
          ticket,
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
