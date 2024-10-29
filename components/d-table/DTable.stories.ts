import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DTable } from ".";

const meta: Meta<typeof DTable> = {
  title: "Components/DTable",
  component: DTable,
  render: (args) => ({
    components: { DTable },
    setup() {
      return {
        args,
        onClick: action("on-click"),
      };
    },

    template: `
    <div>
      <d-table
        v-bind="args"
        @click="onClick"
      />
    </div>
  `,
  }),
};

export default meta;

type Story = StoryObj<typeof DTable>;

export const Default: Story = {
  args: {
    columns: [
      {
        key: true,
        name: "id",
        label: "ID",
        sortable: true,
        widthInPercent: "20%",
        minWidthInPixels: "100px",
        data: "id",
        titleAlignment: "center",
      },
      {
        key: true,
        name: "name",
        label: "Name",
        sortable: true,
        widthInPercent: "20%",
        minWidthInPixels: "100px",
        data: "id",
        titleAlignment: "center",
      },
    ],
    data: [
      { id: 1, name: "The King's Avatar" },
      { id: 2, name: "BLISS" },
      { id: 3, name: "Under the Summer Blue Sky" },
    ],
  },
};
