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

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
  validation: Record<string, FormValidationDefinition>;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: [Record<string, any>];
}>();

const validationResult = ref<Record<string, boolean>>(
  Object.keys(props.values).reduce((obj, key) => {
    obj[key] = true;
    return obj;
  }, {} as Record<string, boolean>),
);

const errorMessage = computed<Record<string, string>>(() =>
  Object.keys(props.values).reduce((obj, key) => {
    obj[key] = !validationResult.value[key]
      ? props.validation[key].errorMessage
      : "";
    return obj;
  }, {} as Record<string, string>),
);

function validate(key: string) {
  validationResult.value[key] = ajv.validate(props.validation[key].schema, props.values[key]);
}

function submit() {
  let fullyValid: boolean = true;

  for (const key in props.values) {
    const valid = ajv.validate(props.validation[key].schema, props.values[key]);
    validationResult.value[key] = valid;
    if (!valid) {
      fullyValid = false;
    }
  }

  if (!fullyValid) {
    return;
  }

  emit("submit", props.values);
}
</script>
