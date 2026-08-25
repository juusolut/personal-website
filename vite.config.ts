import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { mdsvex } from "mdsvex";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import { autoImageProcessor } from "./plugins/imageProcessor";

export default defineConfig({
  plugins: [
    autoImageProcessor({
      format: "webp",
      quality: 85,
      sizes: {
        thumb: { width: 480, height: 270 }, // Custom 16:9 small
        medium: { width: 960, height: 540 }, // Added custom variant
        large: { width: 1920, height: 1080 }, // Custom 16:9 large
      },
      position: "attention", // Smart crop using Sharp's entropy/focus detection
    }),
    iconsSpritesheet({
      // 1. Where your .svg files are located
      inputDir: "src/lib/assets/icons",

      // 2. Where to put the final sprite (needs to be in public for easy access)
      outputDir: "static",

      // 3. File name of the generated sprite
      fileName: "icon_spritesheet.svg",

      // 4. Generate TypeScript types (The "Magic" part)
      withTypes: true,

      // 5. Where to save the generated icon name types
      typesOutputFile: "src/types/icon-names.d.ts",

      // 6. Optional: Auto-format the generated files
      formatter: "prettier",
    }),
    sveltekit({
      extensions: [".svelte", ".md"],
      preprocess: [
        mdsvex({
          extensions: [".md"],
        }),
      ],
      compilerOptions: {
        warningFilter: (warning) =>
          warning.code !== "script_context_deprecated",
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },

      // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
      // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
      // See https://svelte.dev/docs/kit/adapters for more information about adapters.
      adapter: adapter({
        pages: "build",
        assets: "build",
        fallback: undefined,
        precompress: false,
        strict: true,
      }),
    }),
  ],
});
