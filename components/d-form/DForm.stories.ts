import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DForm } from ".";
import { DInput } from "../../components/d-input";
import { DPasswordInput } from "../../components/d-password-input";
import { DButton } from "../../components/d-button";

const meta: Meta<typeof DForm> = {
  title: "Components/DForm",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: {
      DForm,
      DInput,
      DPasswordInput,
      DButton,
    },
    setup() {
      const formValues = ref<{ username: string; password: string }>({
        username: "",
        password: "",
      });

      const formValidation = {
        username: {
          schema: { type: "string", minLength: 1 },
          errorMessage: "Username cannot be empty",
        },
        password: {
          schema: { type: "string", minLength: 1 },
          errorMessage: "Password cannot be empty",
        },
      };

      return {
        args,
        formValues,
        formValidation,
        onSubmit: action("on-submit"),
      };
    },
    template: `
      <div>
        <d-form
          style="width:400px;"
          :values="formValues"
          :validation="formValidation"
          @submit="onSubmit"
        >
          <template #inputs="{ errorMessage, validate }">
            <d-input
              v-model="formValues.username"
              label="Username"
              :error-message="errorMessage.username"
              @update="validate('username')"
            />
            <d-password-input
              v-model="formValues.password"
              label="Password"
              :error-message="errorMessage.password"
              @update="validate('password')"
            />
          </template>

          <template #actions="{ submit }">
            <d-button @click="submit">
              Login
            </d-button>
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
