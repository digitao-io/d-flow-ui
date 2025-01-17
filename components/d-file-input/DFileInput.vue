<template>
  <div class="d-file-input">
    <span class="d-file-input__label">
      {{ props.label }}
    </span>

    <label class="d-file-input__input-container">
      <font-awesome-icon
        class="d-file-input__icon"
        :icon="faFileCirclePlus"
      />

      <div class="d-file-input__prompt">
        {{ props.fileSelectPrompt }}
      </div>

      <input
        ref="file-input"
        class="d-file-input__file-input"
        type="file"
        :accept="props.allowedMimeTypes.join(',')"
        :multiple="props.multiple"
        @change="onFileSelect"
      >
    </label>

    <ul
      v-if="model?.length !== 0"
      class="d-file-input__selected-file-list"
    >
      <li
        v-for="selectedFile of model"
        :key="selectedFile.name"
        class="d-file-input__selected-file"
      >
        <div class="d-file-input__selected-file-info">
          <div class="d-file-input__selected-file-name">
            {{ selectedFile.name }}
          </div>

          <div class="d-file-input__selected-file-metadata">
            {{ selectedFile.type }}, {{ (selectedFile.size / 1024).toFixed(2) }} KiB
          </div>
        </div>
        <button
          class="d-file-input__selected-file-removal-button"
          type="button"
          @click="onFileDelete(selectedFile)"
        >
          <font-awesome-icon :icon="faCircleMinus" />
        </button>
      </li>
    </ul>

    <div
      v-if="props.errorMessage"
      class="d-file-input__error-message"
    >
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const model = defineModel<File[]>();

const props = defineProps<{
  label: string;
  fileSelectPrompt: string;
  allowedMimeTypes: string[];
  multiple?: boolean;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  update: [File[]];
}>();

const fileInput = useTemplateRef("file-input");

function onFileSelect() {
  const files = Array
    .from(fileInput.value!.files ?? [])
    .filter((file) => props.allowedMimeTypes.includes(file.type));
  model.value = files;
  fileInput.value!.value = "";

  emit("update", files);
}

function onFileDelete(deletedFile: File) {
  model.value = model.value?.filter((file) => file !== deletedFile);
}
</script>

<style lang="scss" scoped>
.d-file-input {
  display: block;

  &__label {
    @include tokens.typography-text-s--bold;
    display: block;
    color: tokens.$color-flavor1;
  }

  &__input-container {
    @include tokens.typography-text--medium;
    @include tokens.round-edged-block;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 2px solid tokens.$color-flavor1;
    padding: tokens.$space-l tokens.$space-m;
    color: tokens.$color-flavor1;
    background-color: tokens.$color-flavor1l-t1;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: tokens.$color-flavor1l;
    }
  }

  &__icon {
    width: tokens.$input-size;
    height: tokens.$input-size;
    margin-bottom: tokens.$space-s;
  }

  &__file-input {
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
  }

  &__selected-file-list {
    margin: tokens.$space-s 0;
    max-width: 100%;
    padding: 0;
    list-style: none;
  }

  &__selected-file {
    @include tokens.round-edged-block;
    display: flex;
    justify-content: space-between;
    gap: tokens.$space-s;
    padding: tokens.$space-s;

    &:hover {
      background-color: tokens.$color-flavor1l-t2;
    }
  }

  &__selected-file-info {
    min-width: 0;
  }

  &__selected-file-name {
    @include tokens.typography-text;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__selected-file-metadata {
    @include tokens.typography-text-s;
  }

  &__selected-file-removal-button {
    @include tokens.typography-text;
    margin: 0;
    border: none;
    padding: 0;
    color: tokens.$color-flavor1;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: tokens.$color-flavor1-t1;
    }
  }

  &__error-message {
    @include tokens.typography-text-s;
    color: tokens.$color-error;
  }
}
</style>
