import type { Meta, StoryObj } from "@storybook/vue3";
import { SideMenu } from ".";

const meta: Meta<typeof SideMenu> = {
  title: "SideMenu",
  component: SideMenu,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { SideMenu },
    setup() {
      return args;
    },
    template: `
      <div>
        <side-menu
          :user-name="userName"
          :menu-items="menuItems"
          :current-menu-item="currentMenuItem"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {
    userName: "Example User",
    menuItems: [
      { name: "articles", label: "Articles", url: "/#/articles" },
      { name: "tags", label: "Tags", url: "/#/tags" },
      { name: "files", label: "Files", url: "/#/files" },
    ],
    currentMenuItem: "tags",
  },
};
