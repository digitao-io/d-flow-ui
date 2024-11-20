import path from "node:path";
import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../**/*.stories.ts"],
  addons: [
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern-compiler",
            additionalData: `
              @use "@/styles/_tokens.scss";
            `,
          },
        },
      },
      resolve: {
        alias: {
          "@": path.join(__dirname, ".."),
        },
      },
    });
  },
};

export default config;
