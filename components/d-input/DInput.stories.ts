import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DInput } from ".";

const meta: Meta<typeof DInput> = {
  title: "Components/DInput",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DInput },
    setup() {
      const value = ref<string>("");
      return {
        args,
        value,
      };
    },
    template: `
      <div>
        <d-input
          v-bind="args"
          v-model="value"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DInput>;

export const Default: Story = {
  args: {
    label: "Keyword",
    placeholder: "Search something",
    errorMessage: "Please input a valid keyword!",
  },
};
