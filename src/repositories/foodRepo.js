import Food from "../models/Food";
import db from "../utils/db";
import USE_MONGO from "../utils/dataSource";
import { generateId, readCollection, writeCollection } from "../utils/jsonStore";

const COLLECTION = "foods";

async function listAll() {
  if (USE_MONGO) {
    await db.connect();
    const items = await Food.find({}).lean();
    await db.disconnect();
    return items.map(db.convertDocToObj);
  }
  return readCollection(COLLECTION);
}

async function getById(id) {
  if (USE_MONGO) {
    await db.connect();
    const item = await Food.findById(id).lean();
    await db.disconnect();
    return item ? db.convertDocToObj(item) : null;
  }
  return readCollection(COLLECTION).find((food) => food._id === id) || null;
}

async function getBySlug(slug) {
  if (USE_MONGO) {
    await db.connect();
    const item = await Food.findOne({ slug }).lean();
    await db.disconnect();
    return item ? db.convertDocToObj(item) : null;
  }
  return readCollection(COLLECTION).find((food) => food.slug === slug) || null;
}

async function search({ name, category } = {}) {
  if (USE_MONGO) {
    await db.connect();
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    const items = await Food.find(filter).lean();
    await db.disconnect();
    return items.map(db.convertDocToObj);
  }
  let items = readCollection(COLLECTION);
  if (name) {
    const needle = name.toLowerCase();
    items = items.filter(
      (food) =>
        food.name?.toLowerCase().includes(needle) ||
        food.shortDesc?.toLowerCase().includes(needle),
    );
  }
  if (category) {
    items = items.filter((food) => food.category === category);
  }
  return items;
}

async function create(data) {
  if (USE_MONGO) {
    await db.connect();
    const food = await new Food(data).save();
    await db.disconnect();
    return db.convertDocToObj(food.toObject());
  }
  const items = readCollection(COLLECTION);
  const now = new Date().toISOString();
  const item = {
    rating: 4.5,
    countInStock: 20,
    prichard: false,
    ...data,
    _id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  items.push(item);
  writeCollection(COLLECTION, items);
  return item;
}

async function updateById(id, patch) {
  if (USE_MONGO) {
    await db.connect();
    const food = await Food.findById(id);
    if (!food) {
      await db.disconnect();
      return null;
    }
    Object.assign(food, patch);
    await food.save();
    await db.disconnect();
    return db.convertDocToObj(food.toObject());
  }
  const items = readCollection(COLLECTION);
  const index = items.findIndex((food) => food._id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...patch, updatedAt: new Date().toISOString() };
  writeCollection(COLLECTION, items);
  return items[index];
}

async function removeById(id) {
  if (USE_MONGO) {
    await db.connect();
    const food = await Food.findById(id);
    if (!food) {
      await db.disconnect();
      return false;
    }
    await food.deleteOne();
    await db.disconnect();
    return true;
  }
  const items = readCollection(COLLECTION);
  const next = items.filter((food) => food._id !== id);
  if (next.length === items.length) return false;
  writeCollection(COLLECTION, next);
  return true;
}

const foodRepo = {
  listAll,
  getById,
  getBySlug,
  search,
  create,
  updateById,
  removeById,
};

export default foodRepo;
