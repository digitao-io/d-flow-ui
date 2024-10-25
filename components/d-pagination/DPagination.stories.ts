import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DPagination } from ".";

const meta: Meta<typeof DPagination> = {
  title: "Components/DPagination",
  component: DPagination,
  render: (args) => ({
    components: { DPagination },
    setup() {
      return {
        args,
        onClick: action("on-click"),
      };
    },
    template: `
    <div>
      <d-pagination
        v-bind="args"
        @click="onClick"
      />
    </div>
  `,
  }),
};

export default meta;

type Story = StoryObj<typeof DPagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPage: 10,
  },
};
