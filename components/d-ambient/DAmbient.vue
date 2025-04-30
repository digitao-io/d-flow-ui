<template>
  <div
    class="d-ambient"
    :style="{
      '--icon-size': props.iconSize,
      '--container-width': props.containerWidth,
    }"
  >
    <div class="d-ambient__content">
      <font-awesome-icon
        class="d-ambient__icon"
        :class="{
          'd-ambient__icon--flavor1': props.colorTheme === 'form',
          'd-ambient__icon--flavor2': props.colorTheme === 'table',
        }"
        :icon="`fa-solid ${props.icon}`"
      />

      <div class="d-ambient__extra-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconSize: {
    type: String,
    required: true,
  },
  containerWidth: {
    type: String,
    required: true,
  },
  colorTheme: {
    type: String as PropType<"table" | "form">,
    default: "table",
  },
});
</script>

<style lang="scss" scoped>
.d-ambient {
  display: flex;
  justify-content: center;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: tokens.$space-m;
    width: var(--container-width);
    text-align: center;
  }

  &__icon {
    width: var(--icon-size);
    height: var(--icon-size);

    &--flavor1 {
      color: tokens.$color-flavor1l;
    }

    &--flavor2 {
      color: tokens.$color-flavor2l;
    }
  }
}
</style>
