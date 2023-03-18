import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  switch (method) {
    case "POST":
      try {
        const user = await prisma.user.create({
          data: {
            email: req.body.email,
            name: req.body.name,
            hasCompletedKyc: false,
          },
        });
        res.status(200).json(user);
      } catch (e) {
        res.status(400).json({ message: "Error creating user." });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
