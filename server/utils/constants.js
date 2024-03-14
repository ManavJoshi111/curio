const environment = process.env.ENVIRONMENT;
let CLIENT_URL = process.env.CLIENT_LOCAL_URL;
let SERVER_URL = process.env.SERVER_LOCAL_URL;
let DB_URL = process.env.MONGO_LOCAL_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
const PAGINATION_LIMIT = 10;
const PAGINATION_DEFAULT_PAGE = 1;

if (environment === "production") {
  CLIENT_URL = process.env.CLIENT_PROD_URL;
  SERVER_URL = process.env.SERVER_PROD_URL;
  DB_URL = process.env.MONGO_ATLAS_URI;
}

const ROLES = {
  ADMIN: "admin",
  CONTENT_REVIEWER: "content reviewer",
  MODERATOR: "moderator",
  CONTRIBUTOR: "contributor",
  USER: "user",
};

module.exports = {
  CLIENT_URL,
  SERVER_URL,
  DB_URL,
  ROLES,
  JWT_SECRET,
  JWT_EXPIRE,
  PAGINATION_LIMIT,
  PAGINATION_DEFAULT_PAGE,
};
