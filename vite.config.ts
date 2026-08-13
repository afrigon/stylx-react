import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    root: "playground",
    server: {
        // Listen on IPv6 (dual-stack); use "0.0.0.0" for IPv4-only.
        host: "::"
    },
    resolve: {
        alias: [
            {
                find: "@afrigon/stylx-react/styles.css",
                replacement: fileURLToPath(new URL("./src/styles.css", import.meta.url))
            },
            {
                find: "@afrigon/stylx-react",
                replacement: fileURLToPath(new URL("./src/index.ts", import.meta.url))
            }
        ]
    },
    plugins: [react()]
})
