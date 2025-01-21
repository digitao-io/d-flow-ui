import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DNumberInput } from ".";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof DNumberInput> = {
  title: "Components/DNumberInput",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DNumberInput },
    setup() {
      const value = ref<string>("3.14");
      return {
        args,
        value,
        onUpdate: action("on-update"),
      };
    },
    template: `
      <div style="width:400px;">
        <d-number-input
          v-bind="args"
          v-model="value"
          @update="onUpdate"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DNumberInput>;

export const GermanCurrency: Story = {
  args: {
    label: "Price",
    decimalDigits: 2,
    decimalSeparator: ",",
    groupDigits: 3,
    groupSeparator: ".",
    suffix: "EUR",
    placeholder: "18,00",
    errorMessage: "Number is wrong!",
  },
};

export const USACurrency: Story = {
  args: {
    label: "Price",
    decimalDigits: 2,
    decimalSeparator: ".",
    groupDigits: 3,
    groupSeparator: ",",
    prefix: "$",
    placeholder: "18.00",
  },
};

export const SimpleInteger: Story = {
  args: {
    label: "Number",
    decimalDigits: 0,
    placeholder: "42",
  },
};

export const GroupedInteger: Story = {
  args: {
    label: "Number",
    decimalDigits: 0,
    groupDigits: 3,
    groupSeparator: ",",
    placeholder: "42",
  },
};

export const SimpleFloatDecimal: Story = {
  args: {
    label: "Number",
    decimalSeparator: ".",
    placeholder: "3.141592653",
  },
};

export const GroupedFloatDecimal: Story = {
  args: {
    label: "Number",
    decimalSeparator: ".",
    groupDigits: 3,
    groupSeparator: ",",
    placeholder: "1,234.56789",
  },
};

export const SimpleFixedDecimal: Story = {
  args: {
    label: "Number",
    decimalDigits: 3,
    decimalSeparator: ".",
    placeholder: "123456.789",
  },
};
