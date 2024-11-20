<template>
  <table class="d-table">
    <thead>
      <tr>
        <th
          v-for="column in props.columns"
          :key="column.label"
          class="padding-space"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
        :class="{ 'd-table__selected-row': selectedRowIndex === rowIndex }"
        @click="handleRowClick(row, rowIndex)"
      >
        <td
          v-for="column in props.columns"
          :key="column.name"
          class="padding-space"
        >
          {{ row[column.name] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ColumnDefinition {
  key: boolean;
  name: string;
  label: string;
  sortable: boolean;
  widthInPercent: string;
  minWidthInPixels: string;
  data: string;
  titleAlignment: "start" | "center" | "end" | "left";
}

const props = defineProps<{
  columns: ColumnDefinition[];
  data: Record<string, string | number | boolean | null>[];
}>();

const emit = defineEmits(["row-click"]);
const selectedRowIndex = ref<number | null>(null);

function handleRowClick(row: Record<string, string | number | boolean | null>, rowIndex: number) {
  selectedRowIndex.value = rowIndex;
  const keyOfColumn = props.columns.find((column) => column.key)!;
  const keyValue = row[keyOfColumn.name];
  emit("row-click", keyValue);
}

</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
}

th {
  background-color: tokens.$color-flavor2l-t1;
  color: tokens.$color-neutral-b;
  height: tokens.$input-size;
}

tr {
  background-color: white;
  @include tokens.typography-text;
  height: tokens.$input-size;

  &.d-table__selected-row {
    background-color: tokens.$color-flavor1l-t1;
  }

  &:hover {
    background-color: tokens.$color-flavor1l-t2;
  }
}

.padding-space {
  padding-left: tokens.$space-m;
  padding-right: tokens.$space-m;
  text-align: left;
}
</style>
