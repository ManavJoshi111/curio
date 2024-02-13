import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "vite-plugin-sass";

export default defineConfig({
  css: {
    include: ["**/*.css", "**/*.scss"],
  },
  plugins: [react(), sass()],
});
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    console.clear();
  });
}
