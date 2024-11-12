import type { Meta, StoryObj } from "@storybook/vue3";
import { DDefaultPageLayout } from ".";

const meta: Meta<typeof DDefaultPageLayout> = {
  title: "Components/DDefaultPageLayout",
  component: DDefaultPageLayout,
  render: (args) => ({
    components: { DDefaultPageLayout },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-default-page-layout
          v-bind="args"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DDefaultPageLayout>;

export const Default: Story = {
  args: {
    tableColumnWidth: "5fr",
    formColumnWidth: "3fr",
  },
};
