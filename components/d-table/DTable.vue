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
          <span class="d-table__head-text">{{ column.label }}</span>

          <font-awesome-icon
            v-if="column.sortable"
            class="d-table__head-sorting-icon"
            :class="{
              'd-table__head-sorting-icon--active': column.name === props.sorting.name,
            }"
            :icon="extractSortIcon(column)!"
            @click="changeSorting(column)"
          />
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
        @click="selectRow(row)"
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSort, faArrowUpShortWide, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

export type DTableRowValue = string | number | boolean | null;
export type DTableRowKey = DTableRowValue | DTableRowValue[];
export type DTableRowData = Record<string, DTableRowValue>;

export interface DTableColumnDefinition {
  name: string;
  label: string;
  data: string;
  key: boolean;
  sortable: boolean;
  width: string;
  textAlignment: "start" | "center" | "end";
}

export interface DTableSorting {
  name: string;
  order: "asc" | "desc";
}

const props = defineProps<{
  columns: DTableColumnDefinition[];
  data: DTableRowData[];
  selectedRowKey: DTableRowKey;
  sorting: DTableSorting;
}>();

const emit = defineEmits<{
  selectRow: [DTableRowValue | DTableRowValue[]];
  sortColumn: [DTableSorting];
}>();

const gridTemplateColumns = computed<string>(() => props.columns.map((column) => column.width).join(" "));

function selectRow(row: DTableRowData) {
  emit("selectRow", extractRowKey(row));
}

function extractRowKey(row: DTableRowData): DTableRowKey {
  const keyArray = props.columns
    .filter((column) => column.key)
    .map((column) => row[column.data]);

  return keyArray.length === 1 ? keyArray[0] : keyArray;
}

function matchRowKey(key1: DTableRowKey, key2: DTableRowKey): boolean {
  return JSON.stringify(key1) === JSON.stringify(key2);
}

function extractSortIcon(column: DTableColumnDefinition) {
  if (!column.sortable) {
    return null;
  }

  if (props.sorting.name === column.name) {
    return props.sorting.order === "asc"
      ? faArrowUpShortWide
      : faArrowDownWideShort;
  }
  else {
    return faSort;
  }
}

function changeSorting(column: DTableColumnDefinition) {
  let sorting: DTableSorting;

  if (props.sorting.name !== column.name) {
    sorting = {
      name: column.name,
      order: "asc",
    };
  }
  else {
    sorting = {
      name: props.sorting.name,
      order: props.sorting.order === "asc" ? "desc" : "asc",
    };
  }

  emit("sortColumn", sorting);
}
</script>

<style lang="scss" scoped>
.d-table {
  @include tokens.typography-text;
  table-layout: fixed;
  border-collapse: collapse;

  display: grid;
  grid-template-columns: var(--grid-template-columns);
  gap: 2px;

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
  &__body-row:nth-child(2n + 1) &__body-cell {
    background-color: tokens.$color-neutral-g-t3;
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

  &__head-cell {
    @include tokens.typography-text-s--bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 tokens.$space-s;
    height: tokens.$input-size-s;
    background-color: tokens.$color-flavor2l-t1;
    text-transform: uppercase;
  }

  &__head-cell:last-child {
    @include tokens.round-edged-block;
  }

  &__head-sorting-icon {
    color: tokens.$color-neutral-g;
    cursor: pointer;

    &--active {
      color: tokens.$color-neutral-b;
    }
  }

  &__body-cell {
    padding: tokens.$space-xs tokens.$space-s;
    text-align: var(--text-alignment);
    cursor: pointer;
  }
}
</style>
