import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const UnoCss = await import("unocss/vite").then((i) => i.default);

  return {
    plugins: [uni(), UnoCss()],
    resolve: {
      alias: {
        "promise-polyfill": resolve(__dirname, "node_modules/promise-polyfill"),
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        external: [], // 移除 promise-polyfill 作为外部依赖
      },
    },
  };
});
