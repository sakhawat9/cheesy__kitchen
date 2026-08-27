import Order from "../models/Orders";
import db from "../utils/db";
import USE_MONGO from "../utils/dataSource";
import { generateId, readCollection, writeCollection } from "../utils/jsonStore";

const COLLECTION = "orders";

async function listAll() {
  if (USE_MONGO) {
    await db.connect();
    const items = await Order.find({}).lean();
    await db.disconnect();
    return items.map(db.convertDocToObj);
  }
  return readCollection(COLLECTION);
}

async function listByUser(userId) {
  const items = await listAll();
  return items.filter((order) => order.userInfo?._id === userId);
}

async function create(data) {
  if (USE_MONGO) {
    await db.connect();
    const order = await new Order(data).save();
    await db.disconnect();
    return db.convertDocToObj(order.toObject());
  }
  const items = readCollection(COLLECTION);
  const now = new Date().toISOString();
  const item = { ...data, _id: generateId(), createdAt: now, updatedAt: now };
  items.push(item);
  writeCollection(COLLECTION, items);
  return item;
}

const orderRepo = { listAll, listByUser, create };
export default orderRepo;
