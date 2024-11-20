<template>
  <div
    class="d-sidebar-layout"
    :style="{
      '--menu-column-width': props.menuColumnWidth
    }"
  >
    <div class="d-sidebar-layout__menu">
      <slot name="menu" />
    </div>
    <div class="d-sidebar-layout__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  menuColumnWidth: string;
}>();
</script>

<style lang="scss" scoped>
.d-sidebar-layout {
  display: grid;
  grid-template-columns: var(--menu-column-width) 1fr;
  min-height: 100vh;

  &__menu {
    background-color: tokens.$color-flavor2l-t2;
  }
}
</style>
