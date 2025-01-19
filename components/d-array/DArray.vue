<template>
  <div class="d-array">
    <span class="d-array__label">
      {{ props.label }}
    </span>

    <div class="d-array__list">
      <div
        v-for="(item, index) of model"
        :key="index"
        class="d-array__item"
      >
        <div class="d-array__item-slot">
          <slot
            name="item"
            :item="item"
            :index="index"
          />
        </div>
        <button
          class="d-array__delete-button"
          type="button"
          @click="deleteItem(index)"
        >
          <font-awesome-icon :icon="faCircleMinus" />
        </button>
      </div>
    </div>

    <d-button
      class="d-array__add-button"
      icon="fa-plus"
      :disabled="(model?.length ?? 0) >= (maxItems ?? Number.MAX_SAFE_INTEGER)"
      secondary
      @click="addItem"
    >
      {{ props.addButtonLabel }}
    </d-button>

    <div
      v-if="props.errorMessage"
      class="d-array__error-message"
    >
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { DButton } from "../d-button";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<any[]>();

const props = defineProps<{
  label: string;
  addButtonLabel: string;
  maxItems?: number;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  addItem: [];
  deleteItem: [number];
}>();

function addItem() {
  emit("addItem");
}

function deleteItem(index: number) {
  emit("deleteItem", index);
}
</script>

<style lang="scss" scoped>
.d-array {
  &__label {
    @include tokens.typography-text-s--bold;
    display: block;
    color: tokens.$color-flavor1;
  }

  &__list {
    margin-bottom: tokens.$space-s;
  }

  &__item {
    @include tokens.round-edged-block;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: tokens.$space-s;
    padding: tokens.$space-s;

    &:hover {
      background-color: tokens.$color-flavor1l-t2;
    }
  }

  &__item-slot {
    flex: 1 1;
  }

  &__delete-button {
    @include tokens.typography-text-l;
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
