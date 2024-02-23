const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("../DB/db");
const { authRoutes, preferencesRoutes } = require("../routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferencesRoutes);
connectToDB();

module.exports = app;
