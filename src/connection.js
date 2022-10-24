require("dotenv").config();

const mongoose = require("mongoose");

const url = process.env.MONGODB_URL || "mongodb://localhost:27017/gamessocial";

// main().catch((err) => console.log(err));

module.exports = async function main() {
  // const db =
  await mongoose.connect(url);
  console.log(`Database is running on port 27017`);
  // return db;
};
