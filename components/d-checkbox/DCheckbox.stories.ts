import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DCheckbox } from ".";

const meta: Meta<typeof DCheckbox> = {
  title: "Components/DCheckbox",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DCheckbox },
    setup() {
      const value = ref<boolean>(false);
      return {
        args,
        value,
      };
    },
    template: `
      <d-checkbox v-model="value">
        {{ args.default }}
      </d-checkbox>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DCheckbox>;

export const Default: Story = {
  args: {
    default: "Checkbox Label",
  },
};
