import { Transaction } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, headers } = req;

  interface DailyRevenue {
    date: string;
    totalRevenue: number;
    ticketsPurchased: number;
    revenueFromTicketsPurchased: number;
    ticketsResold: number;
    revenueFromTicketsResold: number;
  }

  switch (method) {
    /**
     * This api will get revenue history
     */
    case "GET":
      try {
        const { eventId } = query;

        let transactions: Transaction[] = [];
        if (eventId != undefined) {
          transactions = await prisma.transaction.findMany({
            where: {
              eventId: eventId as string,
            },
          });
        } else {
          transactions = await prisma.transaction.findMany();
        }

        const revenues: DailyRevenue[] = [];

        // Group transactions by date
        const transactionsByDate = transactions.reduce(
          (acc: any, transaction) => {
            const date = transaction.createdAt.toISOString().substr(0, 10); // Get date in yyyy-mm-dd format
            acc[date] = acc[date] || [];
            acc[date].push(transaction);
            return acc;
          },
          {}
        );

        transactions.forEach((transaction) => {});

        res.status(200).json(transactions);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
