<template>
  <label class="d-textarea">
    <span class="d-textarea__label">
      {{ props.label }}
    </span>
    <textarea
      v-model="model"
      class="d-textarea__textarea"
      :placeholder="props.placeholder"
      @blur="update"
    />
    <div
      v-if="props.errorMessage"
      class="d-textarea__error-message"
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

function update() {
  if (model.value === undefined) {
    return;
  }
  emit("update", model.value);
}
</script>

<style scoped lang="scss">
.d-textarea {
  display: block;

  &__label {
    @include tokens.typography-text-s--bold;
    display: block;
    color: tokens.$color-flavor1;
  }

  &__textarea {
    @include tokens.typography-code;
    @include tokens.round-edged-block;
    width: 100%;
    height: 6 * tokens.$input-size;
    border: none;
    border-bottom: 2px solid tokens.$color-flavor1;
    resize: vertical;
    padding: tokens.$space-s;
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
