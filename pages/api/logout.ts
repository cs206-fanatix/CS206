import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db-client";
import { serialize, parse } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, method, body } = req;

  switch (method) {
    /**
     * This api will log current user out by setting the
     * userId cookie to an expired one if the credentials is successful
     */
    case "GET":
      try {
        const cookies = parse(headers.cookie as string);
        const user = await prisma.user.findUnique({
          where: { id: cookies.userId },
        });
        if (user == null) {
          throw Error("User does not exist.");
        }

        // log out by overriding existing cookie with an expired one
        const cookie = serialize("userId", "deleted", {
          httpOnly: true,
          path: "/",
          expires: new Date(0),
        });

        res.setHeader("Set-Cookie", cookie);
        res.status(200).send("OK");
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
