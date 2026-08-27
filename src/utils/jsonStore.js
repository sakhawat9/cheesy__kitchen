import fs from "fs";
import path from "path";

// Flat-file persistence for the repositories in src/repositories/*.
// Reads and writes data/<collection>.json from the project root. This is the
// default backend so the site runs with no database configured; set
// DATA_SOURCE=mongodb to switch the repositories over to Mongoose instead.
const DATA_DIR = path.join(process.cwd(), "data");

function filePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

export function readCollection(collection) {
  try {
    const raw = fs.readFileSync(filePath(collection), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // A missing or malformed file is treated as an empty collection rather
    // than a crash — every list surface already has an empty state.
    if (error.code !== "ENOENT") {
      console.error(`jsonStore: could not read "${collection}"`, error.message);
    }
    return [];
  }
}

export function writeCollection(collection, items) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(filePath(collection), JSON.stringify(items, null, 2));
}

/** 24-char hex id, so JSON records and Mongo ObjectIds are interchangeable. */
export function generateId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
  return `${timestamp}${random}`;
}
