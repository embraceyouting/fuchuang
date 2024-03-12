import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		// ← ← ← ← ← ←
		host: "0.0.0.0", // ← 新增内容 ←
	},
	resolve: {
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
