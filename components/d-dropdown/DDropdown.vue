<template>
  <label class="d-dropdown">
    <span class="d-dropdown__label">
      {{ props.label }}
    </span>
    <div class="d-dropdown__container">
      <input
        v-model="searchQuery"
        class="d-dropdown__input"
        type="text"
        placeholder="bitte geben Sie Text ein"
        @input="filterOptions"
      >
      <button
        class="d-dropdown__button"
        @click="toggleDropdown"
      >
        &#9660;
      </button>
      <ul
        v-if="showDropdown"
        class="d-dropdown__list"
      >
        <li
          v-for="option in filteredOptions"
          :key="option"
          class="d-dropdown__item"
          @click="selectOption(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  label: string;
}>();

const showDropdown = ref(false);
const options = ref(["Eingegangen", "Eingepackt"]);
const filteredOptions = ref(options.value);
const searchQuery = ref("");

const filterOptions = () => {
  if (searchQuery.value.trim() === "") {
    filteredOptions.value = options.value;
  }
  else {
    filteredOptions.value = options.value.filter((option) =>
      option.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectOption = (option: string) => {
  searchQuery.value = option;
  showDropdown.value = false;
};
</script>

<style lang="scss" scoped>
.d-dropdown__label {
  display: block;
  color: tokens.$color-flavor1;
  @include tokens.typography-text-s--bold;
}

.d-dropdown__container {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.d-dropdown__input {
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

.d-dropdown__button {
  border: none;
  height: tokens.$input-size;
  background-color: tokens.$color-flavor1;
  @include tokens.round-edged-block;
  @include tokens.typography-text--medium;
}

.d-dropdown__list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: tokens.$color-flavor1l-t1;
  list-style: none;
  margin: 0;
  padding-left: tokens.$space-s;
  z-index: 100;
}

.d-dropdown__item {
  @include tokens.typography-text--medium;
  cursor: pointer;
  &:hover {
    background-color: tokens.$color-flavor1l;
  }
}

</style>
