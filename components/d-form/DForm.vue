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
import Ajv, { ErrorObject } from "ajv";

const ajv = new Ajv({
  strictNumbers: true,
});

export type DFormValidationDefinition = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  errorMessage: string | DFormValidationErrorMessageDefinition;
};

export type DFormValidationErrorMessageDefinition =
  | {
    type: "array";
    self: string;
    items: string;
  }
  | {
    type: "object";
    self: string;
    properties: Record<string, string>;
  };

export type DFormErrorMessage = string | DFormErrorMessageObject | DFormErrorMessageArray;

export type DFormErrorMessageObject = {
  type: "object";
  self: string;
  properties: Record<string, string>;
};

export type DFormErrorMessageArray = {
  type: "array";
  self: string;
  items: string[];
};

function errorMessageIsString(
  errMsg: string | DFormValidationErrorMessageDefinition,
): errMsg is string {
  return typeof errMsg === "string" || errMsg instanceof String;
}

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
  validation: Record<string, DFormValidationDefinition>;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: [any];
}>();

const validationResult = ref<Record<string, ErrorObject[] | null>>(
  Object.keys(props.values).reduce((obj, key) => {
    obj[key] = null;
    return obj;
  }, {} as Record<string, ErrorObject[] | null>),
);

const errorMessage = computed<Record<string, DFormErrorMessage>>(() =>
  Object.keys(props.values).reduce((obj, key) => {
    const errors = validationResult.value[key];
    const errorMessageDefinition = props.validation[key].errorMessage;

    if (errorMessageIsString(errorMessageDefinition)) {
      obj[key] = errors ? errorMessageDefinition : "";
      return obj;
    }
    else {
      let errorMessage: DFormErrorMessage;
      if (errorMessageDefinition.type === "array") {
        errorMessage = {
          type: "array",
          self: "",
          items: [...Array((props.values[key] as Array<unknown>).length)].map(() => ""),
        };
      }
      else {
        errorMessage = {
          type: "object",
          self: "",
          properties: Object.keys(props.values[key]).reduce((propertiesObj, key) => {
            propertiesObj[key] = "";
            return propertiesObj;
          }, {} as Record<string, string>),
        };
      }

      for (const error of errors ?? []) {
        if (
          errorMessageDefinition.type === "array"
          && errorMessage.type === "array"
          && error.schemaPath.startsWith("#/items")
        ) {
          const index = Number(error.instancePath.substring(1));
          errorMessage.items[index] = errorMessageDefinition.items ?? "";
        }
        else if (
          errorMessageDefinition.type === "object"
          && errorMessage.type === "object"
          && error.schemaPath.startsWith("#/properties")
        ) {
          const key = error.instancePath.substring(1);
          errorMessage.properties[key] = errorMessageDefinition.properties[key] ?? "";
        }
        else {
          errorMessage.self = errorMessageDefinition.self;
        }
      }

      obj[key] = errorMessage;

      return obj;
    }
  }, {} as Record<string, DFormErrorMessage>),
);

function validate(key: string) {
  const valid = ajv.validate(props.validation[key].schema, props.values[key]);
  validationResult.value[key] = !valid ? ajv.errors! : null;
}

function submit() {
  let fullyValid: boolean = true;

  for (const key in props.values) {
    const valid = ajv.validate(props.validation[key].schema, props.values[key]);
    validationResult.value[key] = !valid ? ajv.errors! : null;
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
