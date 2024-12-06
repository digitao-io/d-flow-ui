import type { Meta, StoryObj } from "@storybook/vue3";
import { DTable, DTableRowKey, DTableSorting } from ".";
import { ref } from "vue";

const meta: Meta<typeof DTable> = {
  title: "Components/DTable",
  component: DTable,
  render: (args) => ({
    components: { DTable },
    setup() {
      const selectedRowKey = ref<DTableRowKey>(null);
      const currentSorting = ref<DTableSorting>({ name: "id", order: "asc" });

      function onSelectRow(key: string) {
        selectedRowKey.value = key;
      }

      function onSortColumn(sorting: DTableSorting) {
        currentSorting.value = sorting;
      }

      return {
        args,
        selectedRowKey,
        currentSorting,
        onSelectRow,
        onSortColumn,
      };
    },

    template: `
    <div>
      <d-table
        v-bind="args"
        :selected-row-key="selectedRowKey"
        :sorting="currentSorting"
        @select-row="onSelectRow"
        @sort-column="onSortColumn"
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
        width: "70px",
        data: "id",
        textAlignment: "end",
      },
      {
        key: false,
        name: "name",
        label: "Name",
        sortable: true,
        width: "minmax(150px, 1fr)",
        data: "name",
        textAlignment: "start",
      },
      {
        key: false,
        name: "description",
        label: "Description",
        sortable: false,
        width: "minmax(450px, 3fr)",
        data: "description",
        textAlignment: "start",
      },
    ],
    data: [
      { id: 1, name: "The King's Avatar", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vestibulum orci massa, vitae viverra libero vulputate eu. Curabitur hendrerit tempus velit, non fringilla sem tempus eget." },
      { id: 2, name: "BLISS", description: "Phasellus porttitor erat id est cursus dictum. Sed ornare orci vitae pulvinar pellentesque. Integer vel diam a dolor dictum consequat." },
      { id: 3, name: "Under the SummerBlue Sky", description: "Proin pharetra eget orci ut dictum. Cras eget lacinia tortor. Maecenas nec enim tincidunt, vulputate neque nec, laoreet magna. Etiam imperdiet auctor ex sit amet elementum. Pellentesque varius tortor sit amet urna accumsan elementum." },
    ],
  },
};
