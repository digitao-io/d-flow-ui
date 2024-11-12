<template>
  <div
    class="d-default-page-layout"
    :style="{ '--table_column_width': props.tableColumnWidth, '--form_column_width': props.formColumnWidth }"
  >
    <div class="d-default-page-layout__center">
      <slot name="center" />
    </div>
    <div class="d-default-page-layout__right">
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
.d-default-page-layout {
  display: grid;
  grid-template-columns: var(--table_column_width) var(--form_column_width);
  min-height: 100vh;
}
</style>
