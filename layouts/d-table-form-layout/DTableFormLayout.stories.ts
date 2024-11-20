import type { Meta, StoryObj } from "@storybook/vue3";
import { DTableFormLayout } from ".";

const meta: Meta<typeof DTableFormLayout> = {
  title: "Layouts/DTableFormLayout",
  component: DTableFormLayout,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { DTableFormLayout },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-table-form-layout v-bind="args">
          <template #table>
            <div style="min-height:100vh; background-color:lightgrey;">
              This is table column
            </div>
          </template>
          <template #form>
            <div style="min-height:100vh; background-color:tomato;">
              This is form column
            </div>
          </template>
        </d-table-form-layout>
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
