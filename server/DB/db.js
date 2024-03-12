const mongoose = require("mongoose");
const { DB_PROD_URL } = require("../utils/constants");
const HOST = DB_PROD_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(HOST, {
      dbName: "curio",
      autoIndex: true,
    });
    console.log(`Connected to department database --> host : ${HOST}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToDB;
