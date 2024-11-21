import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DPasswordInput } from ".";

const meta: Meta<typeof DPasswordInput> = {
  title: "Components/DPasswordInput",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DPasswordInput },
    setup() {
      const value = ref<string>("");
      return {
        args,
        value,
      };
    },
    template: `
    <div>
      <d-password-input
        v-bind="args"
        v-model="value"
      />
    </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DPasswordInput>;

export const Default: Story = {
  args: {
    label: "Password",
    placeholder: "Password please",
    errorMessage: "Password is wrong!",
  },
};
