<template>
  <label class="d-input">
    <span class="d-input__label">
      {{ props.label }}
    </span>
    <input
      v-model="model"
      class="d-input__input"
      type="text"
      :placeholder="props.placeholder"
      @blur="handleBlur"
    >
    <div
      v-if="props.errorMessage"
      class="d-input__error-message"
    >
      {{ props.errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  placeholder?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  update: [string];
}>();

const model = defineModel<string>();

function handleBlur() {
  if (model.value === undefined) {
    return;
  }
  emit("update", model.value);
}
</script>

<style lang="scss" scoped>
.d-input {
  display: block;

  &__label {
    display: block;
    color: tokens.$color-flavor1;
    @include tokens.typography-text-s--bold;
  }

  &__input {
    height: tokens.$input-size;
    padding-left: tokens.$space-s;
    padding-right: tokens.$space-s;
    border: none;
    border-bottom: 2px solid tokens.$color-flavor1;
    width: 100%;
    @include tokens.round-edged-block;
    @include tokens.typography-text--medium;
    background-color: tokens.$color-flavor1l-t1;

    &::placeholder {
      color: tokens.$color-neutral-g;
    }

    &:focus,
    &:active {
      outline: none;
      color: tokens.$color-neutral-b;
      border-bottom-color: tokens.$color-flavor1;
      background-color: tokens.$color-flavor1l;
    }
  }

  &__error-message {
    @include tokens.typography-text-s;
    color: tokens.$color-error;
    min-height: 24px;
  }
}
</style>
