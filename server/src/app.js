const express = require("express");
const { environment } = require("../utils/constants");
const isDev = environment !== "production";
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const connectToDB = require("../DB/db");
const {
  authRoutes,
  topicsRoutes,
  userRoutes,
  questionRoutes,
  answerRoutes,
  voteRoutes,
} = require("../routes");
const { CLIENT_URL } = require("../utils/constants");

if (isDev) {
  app.use(morgan("tiny"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
connectToDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/vote", voteRoutes);

module.exports = app;
