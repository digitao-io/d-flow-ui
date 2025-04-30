<template>
  <button
    class="d-icon-button"
    :class="{
      'd-icon-button--flavor1': props.colorTheme === 'form',
      'd-icon-button--flavor2': props.colorTheme === 'table',
    }"
  >
    <font-awesome-icon :icon="`fa-solid ${props.icon}`" />
  </button>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { PropType } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  colorTheme: {
    type: String as PropType<"table" | "form">,
    default: "table",
  },
});
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
  color: tokens.$color-neutral-b;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }

  &--flavor1 {
    background-color: tokens.$color-flavor1l;

    &:hover,
    &:active {
      background-color: tokens.$color-flavor1l-t1;
    }
  }

  &--flavor2 {
    background-color: tokens.$color-flavor2l;

    &:hover,
    &:active {
      background-color: tokens.$color-flavor2l-t1;
    }
  }
}
</style>
