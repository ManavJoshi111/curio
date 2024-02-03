const mongoose = require("mongoose");
const HOST = process.env.MONGO_LOCAL_URI;

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
