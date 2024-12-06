import type { Meta, StoryObj } from "@storybook/vue3";
import { DTab } from ".";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFilter,
  faSquarePlus,
  faList,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";

library.add(
  faFilter,
  faSquarePlus,
  faList,
  faPencilAlt,
  faTrash,
);

const meta: Meta<typeof DTab> = {
  title: "Components/DTab",

  render: (args) => ({
    components: { DTab },
    setup() {
      const currentTab = ref<string>("filter");

      return {
        args,
        currentTab,
      };
    },
    template: `
      <div style="width:400px; height:400px;">
        <d-tab
          v-model="currentTab"
          :tabs="args.tabs"
        >
          <template #filter>
            This is filter
          </template>
          <template #create>
            This is create
          </template>
          <template #details>
            This is details
          </template>
          <template #update>
            This is update
          </template>
          <template #delete>
            This is delete
          </template>
        </d-tab>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DTab>;

export const Default: Story = {
  args: {
    tabs: [
      { name: "filter", label: "Filtern", icon: "filter" },
      { name: "create", label: "Erstellen", icon: "square-plus" },
      { name: "details", label: "Details", icon: "list" },
      { name: "update", label: "Bearbeiten", icon: "pencil-alt" },
      { name: "delete", label: "Löschen", icon: "trash" },
    ],
  },
};
