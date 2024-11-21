<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: Record<string, { schema: any; errorMessage: string }>;
}>();

</script>
