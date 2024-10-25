import type { Meta, StoryObj } from "@storybook/vue3";
import { DIconButton } from ".";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof DIconButton> = {
  title: "Components/DIconButton",

  component: DIconButton,
  render: (args) => ({
    components: { DIconButton },
    setup() {
      return {
        args,
        onClick: action("on-click"),
      };
    },
    template: `
      <div>
        <d-icon-button
          v-bind="args"
          @click="onClick"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DIconButton>;

export const Default: Story = {
};
