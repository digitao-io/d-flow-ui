import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DSidebarLayout } from "../../layouts/d-sidebar-layout";
import { DNavMenu } from ".";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faBagShopping,
  faBoxesStacked,
  faBookOpen,
  faTags,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHouse,
  faBagShopping,
  faBoxesStacked,
  faBookOpen,
  faTags,
  faUserGroup,
);

const meta: Meta<typeof DNavMenu> = {
  title: "Components/DNavMenu",
  component: DNavMenu,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    components: {
      DSidebarLayout,
      DNavMenu,
    },
    setup() {
      const activatedItem = ref(["products", "titles"]);
      function handleNavigate(path: string[]) {
        activatedItem.value = path;
      }
      return {
        args,
        activatedItem,
        handleNavigate,
      };
    },
    template: `
      <d-sidebar-layout menu-column-width="280px">
        <template #menu>
          <d-nav-menu
            style="margin-right:1rem;"
            v-bind="args"
            :activated-item="activatedItem"
            @navigate="handleNavigate"
          />
        </template>
      </d-sidebar-layout>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DNavMenu>;

export const Default: Story = {
  args: {
    items: [
      { key: "home", label: "Home", icon: "house", children: [] },
      { key: "orders", label: "Bestellungen", icon: "bag-shopping", children: [] },
      { key: "products", label: "Produkte", icon: "boxes-stacked", children: [
        { key: "products", label: "Produkte", icon: "boxes-stacked", children: [] },
        { key: "titles", label: "Titeln", icon: "book-open", children: [] },
        { key: "labels", label: "Labels", icon: "tags", children: [] },
      ] },
      { key: "customers", label: "Kunden", icon: "user-group", children: [] },
    ],
    activatedItem: ["products", "titles"],
  },
};
