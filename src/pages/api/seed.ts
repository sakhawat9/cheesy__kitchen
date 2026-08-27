import type { NextApiRequest, NextApiResponse } from "next";
import Food from "../../models/Food";
import User from "../../models/User";
import USE_MONGO from "../../utils/dataSource";
import db from "../../utils/db";
import { readCollection } from "../../utils/jsonStore";

/**
 * Copies the JSON seed data in /data into MongoDB.
 *
 * Only useful when DATA_SOURCE=mongodb; with the default JSON backend the
 * files in /data *are* the database, so there is nothing to seed. The old
 * version wiped and reinserted every user and dish on an unauthenticated GET,
 * which meant anyone who found the URL could destroy the catalogue.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!USE_MONGO) {
    return res.status(400).json({
      message:
        "Seeding only applies when DATA_SOURCE=mongodb. The JSON files in /data are already the data source.",
    });
  }

  if (!process.env.SEED_SECRET) {
    return res.status(503).json({ message: "SEED_SECRET is not configured" });
  }
  if (req.headers.authorization !== `Bearer ${process.env.SEED_SECRET}`) {
    return res.status(401).json({ message: "Not authorised" });
  }

  await db.connect();
  await User.deleteMany({});
  await User.insertMany(readCollection("users"));
  await Food.deleteMany({});
  await Food.insertMany(readCollection("foods"));
  await db.disconnect();

  return res.status(200).json({ message: "Seeded successfully" });
}
