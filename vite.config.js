import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true
  },
  base: '/',
  // Uncomment to use JSX:
  // esbuild: {
  //   jsx: "transform",
  //   jsxFactory: "m",
  //   jsxFragment: "'['",
  // },
});
