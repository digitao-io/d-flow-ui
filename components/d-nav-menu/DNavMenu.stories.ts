import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DNavMenu } from ".";

const meta: Meta<typeof DNavMenu> = {
  title: "Components/DNavMenu",
  component: DNavMenu,
  render: (args) => ({
    components: { DNavMenu },
    setup() {
      return {
        args,
        onNavigate: action("on-navigate"),
      };
    },
    template: `
      <div>
        <d-nav-menu
          v-bind="args"
          @navigate="onNavigate"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DNavMenu>;

export const Default: Story = {
  args: {
    items: [
      { key: "home", label: "Home", icon: "faHouseFire", children: [] },
      { key: "orders", label: "Bestellungen", icon: "fa-order", children: [] },
      { key: "products", label: "Produkte", icon: "fa-products", children: [
        { key: "products", label: "Produkte", icon: "faHouseFire", children: [] },
        { key: "titles", label: "Titeln", icon: "faHouseFire", children: [] },
        { key: "tags", label: "Tags", icon: "faHouseFire", children: [] },
      ] },
      { key: "labels", label: "Labels", icon: "fa-tag", children: [] },
    ],
    activatedItem: ["products", "titles"],
  },
};
