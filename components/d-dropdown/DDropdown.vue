<template>
  <label class="d-dropdown">
    <div class="d-dropdown__label">
      {{ props.label }}
    </div>
    <div class="d-dropdown__container">
      <input
        class="d-dropdown__input"
        type="text"
        :placeholder="props.placeholder"
        :value="showDropdown ? searchQuery : selectedLabel"
        @input="onInput"
        @keydown.enter="onInputEnterKeyDown"
        @focus="onInputFocus"
      >
      <button
        class="d-dropdown__button"
        type="button"
        @click.stop.prevent="toggleDropdown"
      >
        <font-awesome-icon
          v-if="!showDropdown"
          :icon="faAngleDown"
        />
        <font-awesome-icon
          v-else
          :icon="faAngleUp"
        />
      </button>
      <div
        v-if="showDropdown"
        class="d-dropdown__dropdown-area"
      >
        <ul
          v-if="filteredOptions.length > 0"
          class="d-dropdown__list"
        >
          <li
            v-for="option in filteredOptions"
            :key="option.label"
            class="d-dropdown__item"
          >
            <button
              class="d-dropdown__item-button"
              type="button"
              @click.stop.prevent="selectOption(option)"
            >
              {{ option.label }}
            </button>
          </li>
        </ul>
        <div
          v-else-if="filteredOptions.length === 0 && options.length > 0"
          class="d-dropdown__hint-message"
        >
          {{ props.noResultMessage || 'NO_RESULT_AVAILABLE' }}
        </div>
        <div
          v-else-if="options.length === 0"
          class="d-dropdown__hint-message"
        >
          {{ props.noOptionMessage || 'NO_OPTION_AVAILABLE' }}
        </div>
      </div>
    </div>
    <div
      v-if="props.errorMessage"
      class="d-dropdown__error-message"
    >
      {{ props.errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { computed, nextTick, ref, watch } from "vue";

export interface DDropdownOptionDefinition {
  label: string;
  value: string;
}

const props = defineProps<{
  label: string;
  options: OptionDefinition[];
  placeholder?: string;
  noResultMessage?: string;
  noOptionMessage?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  "update": [string];
}>();

const model = defineModel<string>();

const showDropdown = ref<boolean>(false);
const searchQuery = ref<string>("");

const filteredOptions = computed(() =>
  props.options.filter((option) => option.label.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase())));
const selectedLabel = computed(() =>
  props.options.find((option) => option.value === model.value)?.label ?? "");

watch(() => model.value, (value) => {
  if (value === undefined) {
    return;
  }
  emit("update", value);
});

watch(() => showDropdown.value, (value) => {
  searchQuery.value = value ? "" : selectedLabel.value;
});

async function onInputFocus() {
  if (!showDropdown.value) {
    showDropdown.value = true;
    await nextTick();
  }
}

async function onInput(event: Event) {
  searchQuery.value = (event.target! as HTMLInputElement).value;
}

function onInputEnterKeyDown() {
  if (!filteredOptions.value[0]) {
    return;
  }

  selectOption(filteredOptions.value[0]);
}

function selectOption(option: OptionDefinition) {
  model.value = option.value;
  showDropdown.value = false;
};

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
};
</script>

<style lang="scss" scoped>
.d-dropdown {
  display: block;

  &__label {
    @include tokens.typography-text-s--bold;
    color: tokens.$color-flavor1;
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

  &__dropdown-area {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1;
    padding: tokens.$space-m;
    background-color: tokens.$color-flavor1l-t1;
  }

  &__list {
    margin: 0 (- tokens.$space-m);
    padding: 0;
    list-style: none;
  }

  &__item-button {
    @include tokens.typography-text--medium;
    display: block;
    border: none;
    width: 100%;
    height: tokens.$input-size;
    padding: 0 tokens.$space-m;
    color: tokens.$color-neutral-b;
    background-color: transparent;
    text-align: start;
    cursor: pointer;

    &:hover {
      background-color: tokens.$color-flavor1l;
    }
  }

  &__hint-message {
    @include tokens.typography-text--medium;
    color: tokens.$color-neutral-g;
    text-align: center;
  }

  &__error-message {
    @include tokens.typography-text-s;
    color: tokens.$color-error;
  }
}
</style>
