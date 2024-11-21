import type { Meta, StoryObj } from "@storybook/vue3";
import { DForm } from ".";
import { ref } from "vue";
import { DInput } from "../../components/d-input";
import { DPasswordInput } from "../../components/d-password-input";

const meta: Meta<typeof DForm> = {
  title: "Components/DForm",

  render: (args) => ({
    components: {
      DForm,
      DInput,
      DPasswordInput,
    },
    setup() {
      const formValues = ref<{ username: string; password: string }>({
        username: "username",
        password: "noPassword",
      });

      const formValidation = {
        username: {
          schema: { type: "string", minLength: 1 },
          errorMessage: "username is error",
        },
        password: {
          schema: { type: "string", minLength: 1 },
          errorMessage: "password is error",
        },
      };

      return {
        args,
        formValues,
        formValidation,
      };
    },
    template: `
      <div>
        <d-form v-slot="slotProps" :values="formValues" :validation="formValidation">
            <d-input v-model="formValues.username" label="me input" :error-message="slotProps.errorMessage.username" />
            <d-password-input v-model="formValues.password" label="password" :error-message="slotProps.errorMessage.password" />
        </d-form>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DForm>;

export const Default: Story = {
  args: {
  },
};
