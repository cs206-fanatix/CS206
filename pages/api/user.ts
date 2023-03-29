import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db-client";
import { parse } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers } = req;

  switch (method) {
    /**
     * This api will get user details from the cookie set by the login api
     */
    case "GET":
      try {
        // get cookie
        const cookies = parse(headers.cookie as string);

        const user = await prisma.user.findUnique({
          where: { id: cookies.userId },
        });

        if (user == null) {
          throw Error("User does not exist.");
        }

        res.status(200).json(user);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
