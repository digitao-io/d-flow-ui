import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DButton } from ".";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faPencilAlt);

const meta: Meta<typeof DButton> = {
  title: "Components/DButton",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DButton },
    setup() {
      return {
        args,
        onClick: action("on-click"),
      };
    },
    template: `
      <div>
        <d-button
          v-bind="args"
          @click="onClick"
        >
          Click me!
        </d-button>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DButton>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    secondary: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    icon: "fa-pencil-alt",
  },
};
