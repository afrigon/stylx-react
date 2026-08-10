import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/index.ts", "src/styles.css", "src/preset.css"],
    format: ["esm"],
    dts: true,
    clean: true,
    sourcemap: true,
    external: ["react", "react-dom"]
})
