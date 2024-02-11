export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const ROLES = {
  ADMIN: "admin",
  CONTENT_REVIEWER: "content reviewer",
  MODERATOR: "moderator",
  CONTRIBUTOR: "contributor",
};
export const HOTKEYS = [
  { key: "mod+b", mark: "bold" },
  { key: "mod+i", mark: "italic" },
  { key: "mod+u", mark: "underline" },
  { key: "mod+shift+s", mark: "strikethrough" },
  { key: "mod+`", mark: "code" },
];
