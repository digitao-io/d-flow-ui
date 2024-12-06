<template>
  <table
    class="d-table"
    :style="{
      '--grid-template-columns': gridTemplateColumns,
    }"
  >
    <thead class="d-table__head-area">
      <tr class="d-table__head-row">
        <th
          v-for="column in props.columns"
          :key="column.label"
          class="d-table__head-cell"
          :style="{
            '--text-alignment': column.textAlignment,
          }"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody class="d-table__body-area">
      <tr
        v-for="row in data"
        :key="String(extractRowKey(row))"
        class="d-table__body-row"
        :class="{
          'd-table__body-row--selected': matchRowKey(extractRowKey(row), props.selectedRowKey),
        }"
        @click="handleRowClick(row)"
      >
        <td
          v-for="column in props.columns"
          :key="column.name"
          class="d-table__body-cell"
          :style="{
            '--text-alignment': column.textAlignment,
          }"
        >
          {{ row[column.data] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from "vue";

type RowData = string | number | boolean | null;
type RowKey = RowData | RowData[];
type RowDefinition = Record<string, RowData>;

interface ColumnDefinition {
  key: boolean;
  name: string;
  label: string;
  sortable: boolean;
  width: string;
  data: string;
  textAlignment: "start" | "center" | "end";
}

const props = defineProps<{
  columns: ColumnDefinition[];
  data: RowDefinition[];
  selectedRowKey: RowData | RowData[];
}>();

const emit = defineEmits<{
  selectRow: [RowData | RowData[]];
}>();

const gridTemplateColumns = computed<string>(() => props.columns.map((column) => column.width).join(" "));

function handleRowClick(row: RowDefinition) {
  emit("selectRow", extractRowKey(row));
}

function extractRowKey(row: RowDefinition): RowKey {
  const keyArray = props.columns
    .filter((column) => column.key)
    .map((column) => row[column.data]);

  return keyArray.length === 1 ? keyArray[0] : keyArray;
}

function matchRowKey(key1: RowKey, key2: RowKey): boolean {
  return JSON.stringify(key1) === JSON.stringify(key2);
}
</script>

<style lang="scss" scoped>
.d-table {
  @include tokens.typography-text;
  table-layout: fixed;
  border-collapse: collapse;

  display: grid;
  grid-template-columns: var(--grid-template-columns);

  width: 100%;

  color: tokens.$color-neutral-b;

  box-sizing: content-box;

  &__head-area,
  &__body-area,
  &__head-row,
  &__body-row {
    display: contents;
  }

  &__body-row:nth-child(2n) &__body-cell {
    background-color: tokens.$color-neutral-g-t2;
  }

  &__body-row.d-table__body-row--selected &__body-cell {
    background-color: tokens.$color-flavor1l;
  }

  &__body-row:hover &__body-cell {
    background-color: tokens.$color-flavor1l-t1;

    &:last-child {
      @include tokens.round-edged-block;
    }
  }

  &__head-cell,
  &__body-cell {
    padding: tokens.$space-xs tokens.$space-s;
    text-align: var(--text-alignment);
    cursor: pointer;
  }

  &__head-cell {
    @include tokens.typography-text--bold;
    background-color: tokens.$color-flavor2l-t1;
  }

  &__head-cell:last-child {
    @include tokens.round-edged-block;
  }
}
</style>
