import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DInput } from ".";

const meta: Meta<typeof DInput> = {
  title: "Components/DInput",

  component: DInput,
  render: (args) => ({
    components: { DInput },
    setup() {
      return {
        args,
        onClick: action("on-click"),
      };
    },
    template: `
      <div>
        <d-input
          v-bind="args"
          @click="onClick"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DInput>;

export const Default: Story = {
  args: {
    label: "keyword",
    errorMessage: "input keyword please!",
  },
};
