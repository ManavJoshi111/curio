const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken.user;
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
