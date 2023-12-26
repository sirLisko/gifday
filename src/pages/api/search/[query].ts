import { getRandomGif } from "lib/gifAPI";
import { NextApiHandler } from "next";

const authHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { query } = req.query;
  try {
    const data = await getRandomGif(query as string);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default authHandler;
