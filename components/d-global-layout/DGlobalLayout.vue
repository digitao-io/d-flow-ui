<template>
  <div
    class="d-global-layout"
    :style="{'--menu_column_width': props.menuColumnWidth }"
  >
    <div
      class="d-global-layout__menu"
    >
      <slot name="menu" />
    </div>
    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  menuColumnWidth: string;
}>();
</script>

<style lang="scss" scoped>
.d-global-layout {
  display: grid;
  grid-template-columns: var(--menu_column_width) 1fr;
  min-height: 100vh;

  &__menu {
    background-color: tokens.$color-flavor2l-t2;
  }
}

</style>
