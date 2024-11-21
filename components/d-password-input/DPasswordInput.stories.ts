import type { Meta, StoryObj } from "@storybook/vue3";
import { DPasswordInput } from ".";

const meta: Meta<typeof DPasswordInput> = {
  title: "Components/DPasswordInput",
  component: DPasswordInput,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { DPasswordInput },
    setup() {
      return {
        args,
      };
    },
    template: `
    <div>
      <d-password-input
        v-bind="args"
      />
    </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DPasswordInput>;

export const Default: Story = {
  args: {
    label: "password",
    placeholder: "Please input your password",
    errorMessage: "Password is error",
  },
};
