import type { Meta, StoryObj } from "@storybook/vue3";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import { DAmbient } from ".";

library.add(faCircleQuestion);

const meta: Meta<typeof DAmbient> = {
  title: "Components/DAmbient",

  render: (args) => ({
    components: {
      DAmbient,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-ambient
          v-bind="args"
          icon="fa-circle-question"
          icon-size="160px"
          container-width="240px"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed auctor dictum eros, ut malesuada felis posuere quis.
          </p>
        </d-ambient>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DAmbient>;

export const Default: Story = {
  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  args: {},
};

export const TableArea: Story = {
  args: {
    tableArea: true,
  },
};
