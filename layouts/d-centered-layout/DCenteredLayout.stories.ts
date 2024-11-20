import type { Meta, StoryObj } from "@storybook/vue3";
import { DCenteredLayout } from ".";

const meta: Meta<typeof DCenteredLayout> = {
  title: "layouts/DCenteredLayout",
  component: DCenteredLayout,
  render: (args) => ({
    components: { DCenteredLayout },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-centered-layout v-bind="args">
          <template #display_name>
            <div style="background-color:cadetblue; height: 500px; width: 300px;">
              Center
            </div>
          </template>
        </d-centered-layout>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DCenteredLayout>;

export const Default: Story = {
  args: {
  },
};
