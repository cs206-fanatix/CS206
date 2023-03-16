import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;
  const { id } = req.query;

  switch (method) {
    /**
     * This api will set the userId as the cookie if login is successful or throw an error if login fails
     */
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

        const cookie = serialize("userId", user.id, {
          httpOnly: true,
          path: "/",
        });
        res.setHeader("Set-Cookie", cookie);
        res.status(200).send("OK");
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
