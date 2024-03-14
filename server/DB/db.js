const mongoose = require("mongoose");
const { DB_URL } = require("../utils/constants");

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      dbName: "curio",
      autoIndex: true,
    });
    console.log(`Connected to department database --> host : ${DB_URL}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToDB;
