<template>
  <label
    class="d-checkbox"
  >
    <input
      v-model="model"
      class="d-checkbox__input"
      type="checkbox"
    >
    <font-awesome-icon
      v-if="!model"
      :icon="faSquare"
      class="d-checkbox__icon"
    />
    <font-awesome-icon
      v-else
      :icon="faSquareCheck"
      class="d-checkbox__icon"
    />
    <span
      class="d-checkbox__label"
    >
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const model = defineModel<boolean>();
</script>

<style lang="scss" scoped>
.d-checkbox {
  @include tokens.typography-text-l;
  cursor: pointer;

  &__input {
    display: none;
    margin: 0 2px;
  }

  &__icon {
    font-size: tokens.$input-size;
    color: tokens.$color-flavor1-t1;
  }

  &:hover &__icon  {
    color: tokens.$color-flavor1l;
  }
}

.d-checkbox__label {
  margin: 0 2px;
}

</style>
