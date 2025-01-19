import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DTimePicker } from ".";

const meta: Meta<typeof DTimePicker> = {
  title: "Components/DTimePicker",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DTimePicker },
    setup() {
      const value = ref<string>("2025-01-19T15:31:00+01:00");
      return {
        value,
        args,
        onUpdate: action("on-update"),
      };
    },
    template: `
      <div style="width:400px;">
        <d-time-picker
          v-model="value"
          v-bind="args"
          @update="onUpdate"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DTimePicker>;

export const Default: Story = {
  args: {
    label: "Created At",
    submitButtonLabel: "Done",
    type: "time",
    format: {
      display: "dd. MMM. yyyy', um' HH:mm 'Uhr'",
      firstWeekday: "monday",
      use24HourTime: true,
    },
    numberOfYears: 6,
    numberOfMonths: 6,
    placeholder: "Pick a time",
    errorMessage: "Please select a time",
  },
};

export const DateOnly: Story = {
  args: {
    label: "Birthday",
    type: "date",
    submitButtonLabel: "Done",
    format: {
      display: "DD",
      firstWeekday: "monday",
    },
    numberOfYears: 5,
    numberOfMonths: 5,
    placeholder: "Pick a date",
  },
};

export const MonthOnly: Story = {
  args: {
    label: "Published In",
    type: "month",
    submitButtonLabel: "Done",
    format: {
      display: "MMM, yyyy",
    },
    numberOfYears: 5,
    numberOfMonths: 5,
    placeholder: "Pick a month",
  },
};

export const Use24HourTime: Story = {
  args: {
    label: "Updated At",
    type: "time",
    submitButtonLabel: "Done",
    format: {
      display: "dd. MMM. yyyy', um' HH:mm 'Uhr'",
      firstWeekday: "sunday",
      use24HourTime: false,
    },
    numberOfYears: 5,
    numberOfMonths: 5,
    placeholder: "Pick a time",
  },
};
