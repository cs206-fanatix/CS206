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

        const transactionsDates: string[] = [];
        const transactionsGroupedByDate: Map<string, Transaction[]> = new Map();

        transactions.forEach((transaction) => {
          const date = transaction.createdAt.toISOString().substr(0, 10); // Get date in yyyy-mm-dd format
          if (!transactionsDates.includes(date)) {
            transactionsDates.push(date);
          }
          if (!transactionsGroupedByDate.has(date)) {
            transactionsGroupedByDate.set(date, []);
          }
          transactionsGroupedByDate.get(date)?.push(transaction);
        });

        const revenues: DailyRevenue[] = [];
        transactionsDates.sort();

        transactionsDates.forEach((date) => {
          const transactionsForDate = transactionsGroupedByDate.get(date);

          let totalRevenue = 0;
          let ticketsPurchased = 0;
          let revenueFromTicketsPurchased = 0;
          let ticketsResold = 0;
          let revenueFromTicketsResold = 0;

          transactionsForDate?.forEach((transaction) => {
            totalRevenue += transaction.price;
            if (transaction.type === "purchase") {
              ticketsPurchased += 1;
              revenueFromTicketsPurchased += transaction.price;
            }
            if (transaction.type === "resell") {
              ticketsResold += 1;
              revenueFromTicketsResold += transaction.price;
            }
          });

          const dailyRevenue: DailyRevenue = {
            date,
            totalRevenue,
            ticketsPurchased,
            revenueFromTicketsPurchased,
            ticketsResold,
            revenueFromTicketsResold,
          };
          revenues.push(dailyRevenue);
        });

        res.status(200).json(revenues);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
