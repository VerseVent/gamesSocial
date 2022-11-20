require("dotenv").config();
const Sequelize = require("sequelize");
const logger = require("./helpers/logger");

let isConnectedToDb = null;
const logAlias = "Postgres";

const DB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const connectToDb = async () => {
  if (isConnectedToDb) {
    return DB;
  }

  try {
    await DB.authenticate();

    logger.info(`${logAlias} succesfully connected to db`);

    isConnectedToDb = true;

    await init();

    return DB;
  } catch (error) {
    logger.error(`${logAlias} connection to db failed`);
    throw error;
  }
};

const init = async () => {
  require("./models");

  await DB
    .sync
    //   { force: true } // Reset db every time
    ();
};

module.exports = {
  connectToDb,
  DB,
};

// const mongoose = require("mongoose");

// const url = process.env.MONGODB_URL || "mongodb://localhost:27017/gamessocial";

// // main().catch((err) => console.log(err));

// module.exports = async function main() {
//   // const db =
//   await mongoose.connect(url);
//   console.log(`Database is running on port 27017`);
//   // return db;
// };
