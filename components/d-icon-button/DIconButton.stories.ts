import type { Meta, StoryObj } from "@storybook/vue3";
import { DIconButton } from ".";
import { action } from "@storybook/addon-actions";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof DIconButton> = {
  title: "Components/DIconButton",

  component: DIconButton,
  render: (args) => ({
    components: {
      DIconButton,
      FontAwesomeIcon,
    },
    setup() {
      return {
        args,
        faArrowLeft,
        onClick: action("on-click"),
      };
    },
    template: `
      <div>
        <d-icon-button
          v-bind="args"
          @click="onClick"
        >
          <font-awesome-icon :icon="faArrowLeft" />
        </d-icon-button>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DIconButton>;

export const Default: Story = {
};
