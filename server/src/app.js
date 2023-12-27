const express = require("express");
const app = express();
const connectToDB = require("../DB/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToDB();

module.exports = app;
