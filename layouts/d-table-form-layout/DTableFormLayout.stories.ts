import type { Meta, StoryObj } from "@storybook/vue3";
import { DTableFormLayout } from ".";

const meta: Meta<typeof DTableFormLayout> = {
  title: "Components/DTableFormLayout",
  component: DTableFormLayout,
  render: (args) => ({
    components: { DTableFormLayout },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-table-from-layout
          v-bind="args"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DTableFormLayout>;

export const Default: Story = {
  args: {
    tableColumnWidth: "5fr",
    formColumnWidth: "3fr",
  },
};
