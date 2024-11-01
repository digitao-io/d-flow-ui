import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DTable } from ".";
import { ref } from "vue";

const meta: Meta<typeof DTable> = {
  title: "Components/DTable",
  component: DTable,
  render: (args) => ({
    components: { DTable },
    setup() {
      const selectedRowKeyValue = ref<string | number | boolean | null>(null);

      function getSelectedRowKeyValue(keyValue: string | number | boolean | null) {
        selectedRowKeyValue.value = keyValue;
      }

      return {
        args,
        getSelectedRowKeyValue,
        onClick: action("on-click"),
        selectedRowKeyValue,
      };
    },

    template: `
    <div>
      <d-table
        v-bind="args"
        @row-click="getSelectedRowKeyValue"
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
        titleAlignment: "left",
      },
      {
        key: false,
        name: "name",
        label: "Name",
        sortable: true,
        widthInPercent: "20%",
        minWidthInPixels: "100px",
        data: "id",
        titleAlignment: "left",
      },
    ],
    data: [
      { id: 1, name: "The King's Avatar" },
      { id: 2, name: "BLISS" },
      { id: 3, name: "Under the SummerBlue Sky" },
    ],
  },

};
