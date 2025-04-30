import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DCodeInput } from ".";

const meta: Meta<typeof DCodeInput> = {
  title: "Components/DCodeInput",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DCodeInput },
    setup() {
      const value = ref<string>("");
      return {
        args,
        value,
        onUpdate: action("on-update"),
      };
    },
    template: `
      <div style="width:400px;">
        <d-code-input
          v-bind="args"
          v-model="value"
          @update="onUpdate"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DCodeInput>;

export const Default: Story = {
  args: {
    label: "Markdown",
    placeholder: "Try it out ... Type \"# Hello world!\".",
    errorMessage: "Markdown code cannot be empty.",
  },
};
