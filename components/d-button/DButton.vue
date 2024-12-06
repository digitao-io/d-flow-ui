<template>
  <button
    class="d-button"
    :class="{
      'd-button--primary': !props.secondary,
      'd-button--secondary': props.secondary,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.d-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border: none;
  padding: 2px tokens.$space-m 0 tokens.$space-m;
  height: tokens.$input-size;
  @include tokens.round-edged-block;

  cursor: pointer;

  text-transform: uppercase;
  @include tokens.typography-text--bold;

  transition-property: background-color, transform;
  transition-duration: tokens.$anim-duration;

  &:active {
    transform: translateY(1px);
  }

  &.d-button--primary {
    color: tokens.$color-neutral-w;
    background-color: tokens.$color-flavor1;

    &:hover,
    &:active {
      background-color: tokens.$color-flavor1-t1;
    }
  }

  &.d-button--secondary {
    color: tokens.$color-flavor1-s1;
    background-color: tokens.$color-flavor1l;

    &:hover,
    &:active {
      background-color: tokens.$color-flavor1l-t1;
    }
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    color: tokens.$color-neutral-b-t1;
    background-color: tokens.$color-neutral-g-t1;
    transform: none;
    cursor: not-allowed;
  }
}
</style>
