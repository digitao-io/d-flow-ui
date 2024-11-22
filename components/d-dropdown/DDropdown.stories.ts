import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DDropdown } from ".";

const meta: Meta<typeof DDropdown> = {
  title: "Components/DDropdown",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DDropdown },
    setup() {
      const value = ref<string>("");
      return {
        value,
        args,
        onClick: action("on-click"),
      };
    },
    template: `
      <div style="width:400px;">
        <d-dropdown
          v-model="value"
          v-bind="args"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DDropdown>;

export const Default: Story = {
  args: {
    label: "Status der Bestellung",
    options: [
      { label: "BMW", value: "bmw" },
      { label: "Mercedes-Benz", value: "mercedes" },
      { label: "Audi", value: "audi" },
      { label: "Volkswagen", value: "vw" },
    ],
    placeholder: "Bitte geben Sie Text ein",
  },
};
