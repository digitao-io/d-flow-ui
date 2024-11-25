import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DPasswordInput } from ".";
import { action } from "@storybook/addon-actions";

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
        onUpdate: action("on-update"),
      };
    },
    template: `
      <div style="width:400px;">
        <d-password-input
          v-bind="args"
          v-model="value"
          @update="onUpdate"
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
