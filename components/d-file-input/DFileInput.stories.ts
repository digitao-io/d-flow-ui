import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DFileInput } from ".";

const meta: Meta<typeof DFileInput> = {
  title: "Components/DFileInput",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: { DFileInput },
    setup() {
      const files = ref<File[]>([]);
      return {
        args,
        files,
      };
    },
    template: `
      <div style="width:400px;">
        <d-file-input
          v-bind="args"
          v-model="files"
        />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DFileInput>;

export const Default: Story = {
  args: {
    label: "Image",
    fileSelectPrompt: "Drop file here or click to select an image",
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ],
    multiple: false,
    errorMessage: "Please select an image",
  },
};

export const Multiple: Story = {
  args: {
    label: "Images",
    fileSelectPrompt: "Drop files here or click to select images",
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ],
    multiple: true,
  },
};
