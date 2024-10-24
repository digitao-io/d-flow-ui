import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DDropdown } from ".";

const meta: Meta<typeof DDropdown> = {
  title: "Components/DDropdown",
  component: DDropdown,
  render: (args) => ({
    components: { DDropdown },
    setup() {
      return {
        args,
        onClick: action("on-click"),
      };
    },
    template: `
      <div>
        <d-dropdown
          v-bind="args"
          @click="onClick"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DDropdown>;

export const Default: Story = {
  args: {
    label: "Status der Bestellung",
  },
};
