const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("../DB/db");
const authRoute = require("../routes/auth.routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
//  base/auth/login
connectToDB();

module.exports = app;
