import type { Meta, StoryObj } from "@storybook/vue3";
import { DSidebarLayout } from ".";

const meta: Meta<typeof DSidebarLayout> = {
  title: "layouts/DSidebarLayout",
  component: DSidebarLayout,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { DSidebarLayout },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-sidebar-layout v-bind="args">
          <template #menu>
            <div style="background-color:cadetblue;">
              This is menu slot
            </div>
          </template>
          <template #content>
            <div style="min-height:100vh; background-color:tomato;">
              This is content slot
            </div>
          </template>
        </d-sidebar-layout>
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
