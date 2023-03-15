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
        if (body.email === undefined || body.password === undefined) {
          throw Error("Email and password are required");
        }
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
          where: { email: body.email },
        });
        if (user == null) {
          throw Error("Invalid email or password.");
        }

        res.status(200).json(user);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
