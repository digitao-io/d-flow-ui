import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { DButton } from "../d-button";
import { DDropdown } from "../d-dropdown";
import { DForm } from "../d-form";
import { useDNotification, DNotification, DNotificationParams } from ".";

const meta: Meta<typeof DNotification> = {
  title: "Components/DNotification",

  render: () => ({
    components: {
      DNotification,
      DButton,
      DDropdown,
      DForm,
    },
    setup() {
      const { pushNotification } = useDNotification();
      const formValues = ref<{ type: DNotificationParams["type"] }>({ type: "info" });
      const formValidation = {
        type: {
          schema: { type: "string", enum: ["info", "success", "warn", "error"] },
          errorMessage: "",
        },
      };

      return {
        formValues,
        formValidation,
        pushNotification,
      };
    },
    template: `
      <div>
        <d-form
          style="width:400px;"
          :values="formValues"
          :validation="formValidation"
          @submit="pushNotification({
            type: $event.type,
            title: 'Notification!',
            message: 'There is something needs your attention!',
            dismissInSeconds: 7,
          })"
        >
          <template #inputs="{}">
            <d-dropdown
              v-model="formValues.type"
              label="Choose Notification Type"
              :options="[
                { label: 'Info', value: 'info' },
                { label: 'Success', value: 'success' },
                { label: 'Warning', value: 'warn' },
                { label: 'Error', value: 'error' },
              ]"
            />
          </template>

          <template #actions="{ submit }">
            <d-button @click="submit">
              Show Notification!
            </d-button>
          </template>
        </d-form>

        <d-notification />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DNotification>;

export const Default: Story = {};
