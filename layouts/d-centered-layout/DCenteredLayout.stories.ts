import type { Meta, StoryObj } from "@storybook/vue3";
import { DCenteredLayout } from ".";

const meta: Meta<typeof DCenteredLayout> = {
  title: "layouts/DCenteredLayout",
  component: DCenteredLayout,
  parameters: {
    layout: "fullscreen",
  },
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
          <template #content>
            <div style="background-color:tomato; height:300px; width:300px;">
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
