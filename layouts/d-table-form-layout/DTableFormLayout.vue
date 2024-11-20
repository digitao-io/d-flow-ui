<template>
  <div
    class="d-table-form-layout"
    :style="{
      '--table-column-width': props.tableColumnWidth,
      '--form-column-width': props.formColumnWidth,
    }"
  >
    <div class="d-table-form-layout__table">
      <slot name="table" />
    </div>
    <div class="d-table-form-layout__form">
      <slot name="form" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tableColumnWidth: string;
  formColumnWidth: string;
}>();
</script>

<style lang="scss" scoped>
.d-table-form-layout {
  display: grid;
  grid-template-columns: var(--table-column-width) var(--form-column-width);
  min-height: 100vh;
}
</style>
