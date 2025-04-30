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
      <div style="width:400px;">
        <d-data-list
          v-bind="args"
        >
          <template #my-slot="{ value }">
            <div style="color: white; background-color: tomato; padding: 10px 20px;">
              {{ value }}
            </div>
          </template>
        </d-data-list>
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
      { key: "createdAt", label: "Erstellt", value: "8.Sep.2024 um 19:25:38", type: "text" },
      { key: "updatedAt", label: "Geändert", value: "17.Sep.2024 um 20:36:09", type: "text" },
      { key: "cover", label: "Cover", value: "https://picsum.photos/800/600", type: "image" },
      { key: "genre", label: "Genre", value: ["Action", "E-Sport"], type: "list" },
      { key: "details", label: "Beschreibung", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", type: "text" },
      { key: "slotText", label: "Slot Text", value: "Lorem ipsum", type: "slot", slot: "my-slot" },
      { key: "markdown", label: "Markdown", value: [
        "# Hello world",
        "This should be rendered as Markdown. And this should be a [link](https://example.org).",
        "",
        "There are some important points:",
        "* You are independent",
        "* You are clever",
        "",
        "There are two things to remember:",
        "1. Never say no.",
        "2. Ask yourself whether you should say no.",
      ].join("\n"), type: "markdown" },
    ],
  },
};
