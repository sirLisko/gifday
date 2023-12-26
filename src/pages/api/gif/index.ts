import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { NextApiHandler } from "next";

const authHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { title, day, month, image, video } = req.body;
  const result = await prisma.gif.create({
    data: {
      title,
      day,
      month,
      image,
      video,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
};

export default authHandler;
