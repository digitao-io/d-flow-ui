<template>
  <div
    class="d-table-form-layout"
    :style="{ '--table_column_width': props.tableColumnWidth, '--form_column_width': props.formColumnWidth }"
  >
    <div class="d-table-form-layout__center">
      <slot name="center" />
    </div>
    <div class="d-table-form-layout__right">
      <slot name="right" />
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
  grid-template-columns: var(--table_column_width) var(--form_column_width);
  min-height: 100vh;
}
</style>
