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
    @include tokens.typography-text--medium;
    @include tokens.round-edged-block;
    height: tokens.$input-size;
    width: 100%;
    border: none;
    border-bottom: 2px solid tokens.$color-flavor1;
    padding: 0 tokens.$space-s;
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
  }
}
</style>
