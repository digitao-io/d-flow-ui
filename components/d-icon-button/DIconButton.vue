<template>
  <button
    class="d-icon-button"
  >
    <font-awesome-icon :icon="faArrowLeft" />
    <slot />
  </button>

  <p style="color: tomato">
    {{ props.message }}
  </p>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  message: string;
}>();
</script>

<style lang="scss" scoped>
.d-icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: tokens.$input-size;
  height: tokens.$input-size;
  @include tokens.typography-text;
  border-radius: 50%;
  border: none;
  background-color: tokens.$color-flavor2l;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }

  &:hover,
  &:active {
      background-color: tokens.$color-flavor2l-t1;
  }
}

</style>
