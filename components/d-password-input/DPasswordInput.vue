<template>
  <label class="d-password-input">
    <span class="d-password-input__label">
      {{ props.label }}
    </span>
    <div class="d-password-input__container">
      <input
        v-model="model"
        class="d-password-input__input"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="props.placeholder"
        @blur="handleBlur"
      >
      <button
        class="d-password-input__button"
        type="button"
        @click="togglePassword"
      >
        <font-awesome-icon
          v-if="!showPassword"
          :icon="faEye"
        />
        <font-awesome-icon
          v-else
          :icon="faEyeSlash"
        />
      </button>
    </div>
    <div
      v-if="props.errorMessage"
      class="d-password-input__error-message"
    >
      {{ props.errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  label: string;
  placeholder?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  update: [string];
}>();

const model = defineModel<string>();

const showPassword = ref<boolean>(false);

function handleBlur() {
  if (model.value === undefined) {
    return;
  }
  emit("update", model.value);
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>

<style lang="scss" scoped>
.d-password-input {
  display: block;

  &__label {
    @include tokens.typography-text-s--bold;
    display: block;
    color: tokens.$color-flavor1;
  }

  &__container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  &__input {
    @include tokens.typography-text--medium;
    flex: 1 1;
    height: tokens.$input-size;
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

    &::-ms-reveal,
    &::-ms-clear {
      display: none;
    }
  }

  &__button {
    @include tokens.round-edged-block;
    @include tokens.typography-text--medium;
    border: none;
    height: tokens.$input-size;
    width: tokens.$input-size;
    background-color: tokens.$color-flavor1;
    color: white;
    cursor: pointer;
  }

  &__error-message {
    @include tokens.typography-text-s;
    color: tokens.$color-error;
  }
}
</style>
