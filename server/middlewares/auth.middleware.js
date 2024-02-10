const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const { JWT_SECRET } = require("../utils/constants");
const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decodedToken._id);
    console.log("user: ", req.user);

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.error("Error authenticating user:", err);
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    console.error("Error authenticating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authenticate;
