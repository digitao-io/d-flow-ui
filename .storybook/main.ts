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
            additionalData: `
              @use "./styles/_tokens.scss";
            `,
          },
        },
      },
    });
  },
};

export default config;
