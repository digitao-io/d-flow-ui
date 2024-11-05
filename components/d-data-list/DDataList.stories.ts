import type { Meta, StoryObj } from "@storybook/vue3";
import { DDataList } from ".";

const meta: Meta<typeof DDataList> = {
  title: "Components/DDataList",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DDataList },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div>
        <d-data-list
          v-bind="args"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DDataList>;

export const Default: Story = {
  args: {
    dataValues: [
      { key: "key", label: "Key", value: "tka", type: "text" },
      { key: "name", label: "Name", value: "The King's Avatar", type: "text" },
      { key: "Erstellt", label: "Erstellt", value: "8.Sep.2024 um 19:25:38", type: "text" },
      { key: "Geändert", label: "Geändert", value: "17.Sep.2024 um 20:36:09", type: "text" },
      { key: "Cover", label: "Cover", value: "https://picsum.photos/600/600", type: "image" },
      { key: "Genre", label: "Genre", value: "Action,E-Sport", type: "text" },
      { key: "Beschreibung", label: "Beschreibung", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", type: "text" },
    ],
  },
};
