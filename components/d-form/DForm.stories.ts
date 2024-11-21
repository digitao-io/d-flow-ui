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
          schema: { type: "string", min: 1 },
          errorMessage: "username is error",
        },
        password: {
          schema: { type: "string", min: 1 },
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
        <d-form :values="formValues" :validation="formValidation">
          <template>
            <d-input v-model="formValues.username" label="me input"/>
            <d-password-input v-model="formValues.password" label="password" />
          </template>
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
