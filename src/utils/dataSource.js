// Picks which backend the repositories in src/repositories/* talk to.
// Defaults to the local JSON files (no database required). Set
// DATA_SOURCE=mongodb once you have a working MONGODB_URI to switch back.
const USE_MONGO = process.env.DATA_SOURCE === "mongodb";

export default USE_MONGO;
