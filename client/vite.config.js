import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  css: {
    include: ["**/*.css", "**/*.scss"],
  },
  plugins: [react()],
});
if (import.meta.hot) {
  console.clear();
}
