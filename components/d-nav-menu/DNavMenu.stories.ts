import type { Meta, StoryObj } from "@storybook/vue3";
import { DNavMenu } from ".";
import { ref } from "vue";

const meta: Meta<typeof DNavMenu> = {
  title: "Components/DNavMenu",
  component: DNavMenu,
  render: (args) => ({
    components: { DNavMenu },
    setup() {
      const selectedName = ref<string | null>(null);

      function getNavigateName(key: string) {
        selectedName.value = key;
      }

      return {
        args,
        getNavigateName,
        selectedName,
      };
    },
    template: `
      <div>
        <d-nav-menu
          v-bind="args"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DNavMenu>;

export const Default: Story = {
  args: {
    menuItems: [
      { key: "home", label: "Home", icon: "faHouseFire", children: [] },
      { key: "orders", label: "Bestellungen", icon: "fa-order", children: [] },
      { key: "products", label: "Produkte", icon: "fa-products", children: [{
        key: "titles", label: "Titeln", icon: "faHouseFire", children: [],
      }] },
      { key: "labels", label: "Labels", icon: "fa-tag", children: [] },
    ],
    activatedItem: ["products", "titles"],
  },
};
