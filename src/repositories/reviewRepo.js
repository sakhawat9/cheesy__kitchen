import Review from "../models/Review";
import db from "../utils/db";
import USE_MONGO from "../utils/dataSource";
import { generateId, readCollection, writeCollection } from "../utils/jsonStore";

const COLLECTION = "reviews";

async function listAll() {
  if (USE_MONGO) {
    await db.connect();
    const items = await Review.find({}).lean();
    await db.disconnect();
    return items.map(db.convertDocToObj);
  }
  return readCollection(COLLECTION);
}

async function create(data) {
  if (USE_MONGO) {
    await db.connect();
    const review = await new Review(data).save();
    await db.disconnect();
    return db.convertDocToObj(review.toObject());
  }
  const items = readCollection(COLLECTION);
  const now = new Date().toISOString();
  const item = { ...data, _id: generateId(), createdAt: now, updatedAt: now };
  items.push(item);
  writeCollection(COLLECTION, items);
  return item;
}

const reviewRepo = { listAll, create };
export default reviewRepo;
