import type { Meta, StoryObj } from "@storybook/vue3";
import { DSidebarLayout } from ".";

const meta: Meta<typeof DSidebarLayout> = {
  title: "Components/DSidebarLayout",
  component: DSidebarLayout,
  render: (args) => ({
    components: { DSidebarLayout },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-sidebar-layout
          v-bind="args"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DSidebarLayout>;

export const Default: Story = {
  args: {
    menuColumnWidth: "280px",
  },
};
