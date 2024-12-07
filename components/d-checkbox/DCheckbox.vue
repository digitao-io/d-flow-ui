<template>
  <label
    class="d-checkbox"
  >
    <input
      v-model="model"
      class="d-checkbox__input"
      type="checkbox"
    >
    <font-awesome-icon
      v-if="!model"
      :icon="faSquare"
      class="d-checkbox__icon"
    />
    <font-awesome-icon
      v-else
      :icon="faSquareCheck"
      class="d-checkbox__icon"
    />
    <span
      class="d-checkbox__label"
    >
      {{ props.label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const model = defineModel<boolean>();

const props = defineProps<{
  label: string;
}>();
</script>

<style lang="scss" scoped>
.d-checkbox {
  @include tokens.typography-text--bold;
  @include tokens.round-edged-block;
  display: inline-flex;
  align-items: center;
  padding: 0 tokens.$space-m 0 tokens.$space-s;
  height: tokens.$input-size;
  color: tokens.$color-neutral-b;
  cursor: pointer;

  &__input {
    display: none;
  }

  &__icon {
    @include tokens.typography-text-l;
    margin-right: tokens.$space-s;
    color: tokens.$color-flavor1;
  }

  &__label {
    padding-top: 2px;
  }

  &:hover {
    background-color: tokens.$color-flavor1l-t1;
  }
}
</style>
