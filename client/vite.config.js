import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteSassPlugin from "vite-plugin-sass";

export default defineConfig({
  plugins: [react(), ViteSassPlugin()],
});
