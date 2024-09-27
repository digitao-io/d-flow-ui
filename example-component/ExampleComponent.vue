<script setup lang="ts">
const props = defineProps<{
  message: string;
}>();
</script>

<template>
  <p style="color: tomato">
    {{ props.message }}
  </p>
</template>
