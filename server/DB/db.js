const mongoose = require("mongoose");
const HOST = process.env.MONGO_ATLAS_URI;

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
