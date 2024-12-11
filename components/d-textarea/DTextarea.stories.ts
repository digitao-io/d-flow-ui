import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DTextarea } from ".";

const meta: Meta<typeof DTextarea> = {
  title: "Components/DTextarea",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DTextarea },
    setup() {
      const value = ref<string>("");
      return {
        args,
        value,
        onUpdate: action("on-update"),
      };
    },
    template: `
      <div style="width:400px;">
        <d-textarea
          v-bind="args"
          v-model="value"
          @update="onUpdate"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DTextarea>;

export const Default: Story = {
  args: {
    label: "Keyword",
    placeholder: "Search something",
    errorMessage: "Please input a valid keyword!",
  },
};
