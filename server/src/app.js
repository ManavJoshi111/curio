const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("../DB/db");
const {
  authRoutes,
  topicsRoutes,
  userRoutes,
  questionRoutes,
  answerRoutes,
} = require("../routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connectToDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

module.exports = app;
