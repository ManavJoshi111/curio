const environment = import.meta.env.VITE_ENVIRONMENT;
let SERVER_URL = import.meta.env.VITE_SERVER_LOCAL_URL;
const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const PAGINATION_LIMIT = 10;
const PAGINATION_DEFAULT_PAGE = 1;

if (environment === "production") {
  SERVER_URL = import.meta.env.VITE_SERVER_PROD_URL;
}

const ROLES = {
  ADMIN: "admin",
  CONTENT_REVIEWER: "content reviewer",
  MODERATOR: "moderator",
  CONTRIBUTOR: "contributor",
};

const TOOLBAR_BUTTONS = [
  { key: "mod+b", mark: "bold", type: "mark" },
  { key: "mod+i", mark: "italic", type: "mark" },
  { key: "mod+u", mark: "underline", type: "mark" },
  { key: "mod+shift+s", mark: "strikethrough", type: "mark" },
  { key: "mod+`", mark: "code", type: "mark" },
  { block: "list-ul", type: "block" },
  { block: "list-ol", type: "block" },
];

export {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_PRESET,
  PAGINATION_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  ROLES,
  TOOLBAR_BUTTONS,
};
