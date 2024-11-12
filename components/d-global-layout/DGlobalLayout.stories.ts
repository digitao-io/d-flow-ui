import type { Meta, StoryObj } from "@storybook/vue3";
import { DGlobalLayout } from ".";

const meta: Meta<typeof DGlobalLayout> = {
  title: "Components/DGlobalLayout",
  component: DGlobalLayout,
  render: (args) => ({
    components: { DGlobalLayout },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-global-layout
          v-bind="args"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DGlobalLayout>;

export const Default: Story = {
  args: {
    menuColumnWidth: "280px",
  },
};
