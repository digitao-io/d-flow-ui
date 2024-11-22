<template>
  <form>
    <slot :error-message="value" />
  </form>
</template>

<script setup lang="ts">
import Ajv from "ajv";
import { computed } from "vue";

const ajv = new Ajv();

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: Record<string, { schema: any; errorMessage: string }>;
}>();

const value = computed(() => {
  const errorMessage: Record<string, string> = {};
  for (const key in props.values) {
    const validate = ajv.compile(props.validation[key].schema);
    const valid = validate(props.values[key]);
    errorMessage[key] = valid ? "" : props.validation[key].errorMessage;
  }
  return errorMessage;
});
</script>
