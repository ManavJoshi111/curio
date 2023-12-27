const express = require("express");
const app = express();
const connectToDB = require("../DB/db");
const authRoute = require("../routes/auth.routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoute);
connectToDB();

module.exports = app;
