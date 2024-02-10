exports.CLIENT_URL = process.env.CLIENT_URL;
exports.SERVER_URL = process.env.SERVER_URL;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ROLES = {
  ADMIN: "admin",
  CONTENT_REVIEWER: "content reviewer",
  MODERATOR: "moderator",
  CONTRIBUTOR: "contributor",
  USER: "user",
};