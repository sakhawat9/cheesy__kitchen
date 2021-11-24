import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Food from "../../models/Food";
import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = nc();
type Data = {
  message: string;
};

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Food.deleteMany();
  await Food.insertMany(data.food);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
