import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DPagination } from ".";

const meta: Meta<typeof DPagination> = {
  title: "Components/DPagination",
  component: DPagination,
  render: (args) => ({
    components: { DPagination },
    setup() {
      const currentPage = ref<number>(args.currentPage);

      function onChange(newPageNumber: number) {
        currentPage.value = newPageNumber;
      }

      return {
        args,
        currentPage,
        onChange,
      };
    },
    template: `
      <div>
        <d-pagination
          :current-page="currentPage"
          :total-pages="args.totalPages"
          @change="onChange"
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
    totalPages: 10,
  },
};
