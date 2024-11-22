<template>
  <form
    class="d-form"
    @submit.prevent
  >
    <slot
      :error-message="errorMessage"
      :validate="validate"
      :submit="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Ajv from "ajv";

const ajv = new Ajv();

type FormValidationDefinition = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  errorMessage: string;
};

type FormValidationResult = {
  dirty: boolean;
  valid: boolean;
};

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
  validation: Record<string, FormValidationDefinition>;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: [Record<string, any>];
}>();

const validationResult = ref<Record<string, FormValidationResult>>(
  Object.keys(props.values).reduce((obj, key) => {
    obj[key] = { dirty: false, valid: true };
    return obj;
  }, {} as Record<string, FormValidationResult>),
);

const errorMessage = computed<Record<string, string>>(() =>
  Object.keys(props.values).reduce((obj, key) => {
    obj[key] = (validationResult.value[key].dirty && !validationResult.value[key].valid)
      ? props.validation[key].errorMessage
      : "";
    return obj;
  }, {} as Record<string, string>),
);

function validate(dirtyField?: string): boolean {
  let fullyValid: boolean = true;

  if (dirtyField) {
    validationResult.value[dirtyField].dirty = true;
  }

  for (const key in props.values) {
    if (!validationResult.value[key].dirty) {
      continue;
    }

    const valid = ajv.validate(props.validation[key].schema, props.values[key]);
    validationResult.value[key].valid = valid;
    if (!valid) {
      fullyValid = false;
    }
  }

  return fullyValid;
}

function submit() {
  Object.keys(validationResult.value).forEach((key) => {
    validationResult.value[key].dirty = true;
  });

  if (!validate()) {
    return;
  }

  emit("submit", props.values);
}
</script>
