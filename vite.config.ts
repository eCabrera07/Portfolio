// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Vercel runs TanStack Start through Nitro. The Lovable wrapper can also emit
// Cloudflare Worker output, so disable that path for Vercel deployments.
export default defineConfig({
  cloudflare: false,
  plugins: [nitro()],
  tanstackStart: {
    server: { entry: "server" },
  },
});
