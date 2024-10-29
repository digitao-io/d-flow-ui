import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DDropdown } from ".";

const meta: Meta<typeof DDropdown> = {
  title: "Components/DDropdown",
  component: DDropdown,
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
      <div>
        <d-dropdown
          v-model="value"
          v-bind="args"
        />
        <p>Selected value: {{ value }}</p>
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
