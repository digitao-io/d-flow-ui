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
    <small
      class="d-password-input__error-message"
    >
      {{ props.errorMessage }}
    </small>
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
  &__label {
    display: block;
    color: tokens.$color-flavor1;
    @include tokens.typography-text-s--bold;
  }

  &__container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  &__input {
    flex: 1 1;
    height: tokens.$input-size;
    padding-left: tokens.$space-s;
    padding-right: tokens.$space-s;
    border: none;
    border-bottom: 2px solid tokens.$color-flavor1;
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
    display: block;
    color: tokens.$color-error;
    min-height: 24px;
    @include tokens.typography-text-s;
  }
}
</style>
