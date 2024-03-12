exports.CLIENT_URL = process.env.CLIENT_URL;
exports.SERVER_URL = process.env.SERVER_URL;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRE = process.env.JWT_EXPIRE;
exports.PAGINATION_LIMIT = 10;
exports.PAGINATION_DEFAULT_PAGE = 1;

exports.ROLES = {
  ADMIN: "admin",
  CONTENT_REVIEWER: "content reviewer",
  MODERATOR: "moderator",
  CONTRIBUTOR: "contributor",
  USER: "user",
};
