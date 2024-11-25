<template>
  <label class="d-dropdown">
    <span class="d-dropdown__label">
      {{ props.label }}
    </span>
    <div class="d-dropdown__container">
      <input
        class="d-dropdown__input"
        type="text"
        :placeholder="props.placeholder"
        :value="showDropdown ? searchQuery : selectedLabel"
        @input="handleInput"
        @keydown.enter="handleEnterKeydown"
      >
      <button
        class="d-dropdown__button"
        @click="toggleDropdown"
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
      <ul
        v-if="showDropdown"
        class="d-dropdown__list"
      >
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          class="d-dropdown__item"
        >
          <button
            class="d-dropdown__item-button"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </button>
        </li>
      </ul>
    </div>
  </label>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { computed, nextTick, ref, watch } from "vue";

interface OptionDefinition {
  label: string;
  value: string;
}

const props = defineProps<{
  label: string;
  options: OptionDefinition[];
  placeholder: string;
}>();

const emit = defineEmits<{
  "update": [string];
}>();

const model = defineModel<string>();

const showDropdown = ref<boolean>(false);
const searchQuery = ref<string>("");

const filteredOptions = computed(() =>
  props.options.filter((option) => option.label.toLocaleLowerCase().startsWith(searchQuery.value.toLocaleLowerCase())));
const selectedLabel = computed(() =>
  props.options.find((option) => option.value === model.value)?.label ?? "");

watch(() => model.value, (value) => {
  if (value === undefined) {
    return;
  }
  emit("update", value);
});

async function handleInput(event: Event) {
  const newValue = (event.target! as HTMLInputElement).value;

  if (!showDropdown.value) {
    toggleDropdown();
    await nextTick();
  }

  searchQuery.value = newValue;
}

function handleEnterKeydown() {
  if (!filteredOptions.value[0]) {
    return;
  }

  model.value = filteredOptions.value[0].value;
  toggleDropdown();
}

function selectOption(option: OptionDefinition) {
  model.value = option.value;
  toggleDropdown();
};

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;

  if (showDropdown.value) {
    searchQuery.value = "";
  }
  else {
    searchQuery.value = selectedLabel.value;
  }
};
</script>

<style lang="scss" scoped>
.d-dropdown {
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

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 9999;
    margin: 0;
    padding: 0;
    background-color: tokens.$color-flavor1l-t1;
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
}
</style>
