import type { Meta, StoryObj } from "@storybook/vue3";
import { DIconButton } from ".";
import { action } from "@storybook/addon-actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft);

const meta: Meta<typeof DIconButton> = {
  title: "Components/DIconButton",

  component: DIconButton,
  render: () => ({
    components: {
      DIconButton,
    },
    setup() {
      return {
        onClick: action("on-click"),
      };
    },
    template: `
      <div>
        <d-icon-button
          icon="fa-arrow-left"
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
