import type { Preview } from "@storybook/vue3";

import "../styles/base.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).context = {};

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "White", value: "#ffffff" },
        { name: "Cold", value: "#eceff1" },
        { name: "Warm", value: "#fff6ee" },
      ],
      // 👇 Specify which background is shown by default
      default: "White",
    },
  },
};

export default preview;
