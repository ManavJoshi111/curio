// vite.config.js
import { defineConfig } from "file:///D:/Manav/B.Tech/Sem%208/curio/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Manav/B.Tech/Sem%208/curio/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import sass from "file:///D:/Manav/B.Tech/Sem%208/curio/client/node_modules/vite-plugin-sass/index.js";
var vite_config_default = defineConfig({
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNYW5hdlxcXFxCLlRlY2hcXFxcU2VtIDhcXFxcY3VyaW9cXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNYW5hdlxcXFxCLlRlY2hcXFxcU2VtIDhcXFxcY3VyaW9cXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9NYW5hdi9CLlRlY2gvU2VtJTIwOC9jdXJpby9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHNhc3MgZnJvbSBcInZpdGUtcGx1Z2luLXNhc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgY3NzOiB7XG4gICAgaW5jbHVkZTogW1wiKiovKi5jc3NcIiwgXCIqKi8qLnNjc3NcIl0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBzYXNzKCldLFxufSk7XG5pZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4gIGltcG9ydC5tZXRhLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICBjb25zb2xlLmNsZWFyKCk7XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLG9CQUFvQjtBQUNuVSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRWpCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLEtBQUs7QUFBQSxJQUNILFNBQVMsQ0FBQyxZQUFZLFdBQVc7QUFBQSxFQUNuQztBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0IsQ0FBQztBQUNELElBQUksWUFBWSxLQUFLO0FBQ25CLGNBQVksSUFBSSxRQUFRLE1BQU07QUFDNUIsWUFBUSxNQUFNO0FBQUEsRUFDaEIsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
