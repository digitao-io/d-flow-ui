import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { DForm } from "../d-form";
import { DInput } from "../../components/d-input";
import { DButton } from "../../components/d-button";
import { DArray } from ".";

const meta: Meta<typeof DArray> = {
  title: "Components/DArray",

  parameters: {
    backgrounds: {
      default: "Warm",
    },
  },

  render: (args) => ({
    components: {
      DArray,
      DForm,
      DInput,
      DButton,
    },
    setup() {
      const formValues = ref<{ message: string; tags: string[] }>({
        message: "",
        tags: [],
      });

      const formValidation = {
        message: {
          schema: { type: "string", minLength: 1 },
          errorMessage: "Username cannot be empty",
        },
        tags: {
          schema: {
            type: "array",
            minItems: 1,
            items: {
              type: "string",
              minLength: 1,
            },
          },
          errorMessage: {
            type: "array",
            self: "At least 1 tag should be provided",
            items: "Tag cannot be empty",
          },
        },
      };

      function addTag() {
        formValues.value.tags = [...formValues.value.tags, ""];
      }

      function deleteTag(index: number) {
        formValues.value.tags.splice(index, 1);
        formValues.value.tags = [...formValues.value.tags];
      }

      return {
        args,
        formValues,
        formValidation,
        addTag,
        deleteTag,
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
              v-model="formValues.message"
              label="Message"
              :error-message="errorMessage.message"
              @update="validate('message')"
            />
            <d-array
              v-model="formValues.tags"
              label="Tags"
              addButtonLabel="Add New Tag"
              :max-items="3"
              :error-message="errorMessage.tags.self"
              @add-item="addTag"
              @delete-item="deleteTag"
            >
              <template #item="{ index }">
                <d-input
                  v-model="formValues.tags[index]"
                  :label="'Tag ' + (index + 1)"
                  :error-message="errorMessage.tags.items?.[index]"
                  @update="validate('tags')"
                />
              </template>
            </d-array>
          </template>

          <template #actions="{ submit }">
            <d-button @click="submit">
              Submit
            </d-button>
          </template>
        </d-form>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof DArray>;

export const Default: Story = {
  args: {
  },
};
