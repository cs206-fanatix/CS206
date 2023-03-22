import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db-client";

interface UserUpdateData {
  name?: string;
  email?: string;
  hasCompletedKyc?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: id as string,
          },
          include: {
            tickets: {
              include: {
                event: true,
              },
            },
          },
        });
        res.status(200).json(user);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;
    case "PUT":
      const data: UserUpdateData = {};
      if (req.body.name !== undefined) {
        data.name = req.body.name;
      }
      if (req.body.email !== undefined) {
        data.email = req.body.email;
      }
      if (req.body.hasCompletedKyc !== undefined) {
        data.hasCompletedKyc = req.body.hasCompletedKyc;
      }

      try {
        const user = await prisma.user.update({
          where: {
            id: id as string,
          },
          data: data,
        });
        res.status(200).json(user);
      } catch (e) {
        res.status(400).json((e as Error).message);
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
