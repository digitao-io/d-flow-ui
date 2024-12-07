<template>
  <form
    class="d-form"
    @submit.prevent
  >
    <div class="d-form__inputs">
      <slot
        name="inputs"
        :error-message="errorMessage"
        :validate="validate"
        :submit="submit"
      />
    </div>

    <div class="d-form__actions">
      <slot
        name="actions"
        :error-message="errorMessage"
        :validate="validate"
        :submit="submit"
      />
    </div>
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

<style lang="scss" scoped>
.d-form {
  &__inputs {
    margin-bottom: tokens.$space-m;

    & > * {
      margin-bottom: tokens.$space-s;
    }
  }
}
</style>
