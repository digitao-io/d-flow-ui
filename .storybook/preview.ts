import type { Preview } from "@storybook/vue3";

import "../styles/base.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).context = {};

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "White", value: "#FFFFFF" },
        { name: "Cold", value: "#ECEFF1" },
        { name: "Warm", value: "#FFF7F1" },
      ],
      // 👇 Specify which background is shown by default
      default: "White",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
