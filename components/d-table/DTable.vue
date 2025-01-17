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
            v-if="props.sorting && column.sortable"
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
        v-for="(row, index) in data"
        :key="String(extractRowKey(row))"
        class="d-table__body-row"
        :class="{
          'd-table__body-row--selected': props.selectedRowKeys.includes(extractRowKey(row)),
        }"
        @mousedown.prevent="selectRow(row, index, $event)"
      >
        <td
          v-for="column in props.columns"
          :key="column.name"
          class="d-table__body-cell"
          :style="{
            '--text-alignment': column.textAlignment,
          }"
        >
          <template v-if="column.slot">
            <slot
              :name="column.slot"
              :cell-data="row[column.data]"
            />
          </template>
          <template v-else>
            {{ row[column.data] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSort, faArrowUpShortWide, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DTableRowData = Record<string, any>;
export type DTableRowKey = string | number;

export interface DTableColumnDefinition {
  name: string;
  label: string;
  data: string;
  width: string;
  textAlignment: "start" | "center" | "end";
  slot?: string;
  key?: true;
  sortable?: true;
}

export interface DTableSorting {
  name: string;
  order: "asc" | "desc";
}

const props = defineProps<{
  columns: DTableColumnDefinition[];
  data: DTableRowData[];
  selectedRowKeys: DTableRowKey[];
  sorting?: DTableSorting;
  multipleSelect?: boolean;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectRows: [any[]];
  sortColumn: [DTableSorting];
}>();

const gridTemplateColumns = computed<string>(() => props.columns.map((column) => column.width).join(" "));

function selectRow(row: DTableRowData, index: number, ev: MouseEvent) {
  const newKey = extractRowKey(row);

  if (ev.ctrlKey && props.multipleSelect) {
    if (props.selectedRowKeys.includes(newKey)) {
      emit("selectRows", [...props.selectedRowKeys.filter((key) => key !== newKey)]);
    }
    else {
      emit("selectRows", [...props.selectedRowKeys, newKey]);
    }
  }
  else if (ev.shiftKey && props.multipleSelect) {
    const lastSelectedKey = props.selectedRowKeys[props.selectedRowKeys.length - 1];

    if (!lastSelectedKey) {
      emit("selectRows", [newKey]);
    }
    else {
      const lastSelectedIndex = props.data.findIndex((rowData) => extractRowKey(rowData) === lastSelectedKey);
      if (lastSelectedIndex < 0) {
        emit("selectRows", [newKey]);
      }
      else {
        const selectedKeys = [];

        const startIndex = Math.min(lastSelectedIndex, index);
        const endIndex = Math.max(lastSelectedIndex, index);

        for (let i = startIndex; i <= endIndex; i++) {
          selectedKeys.push(extractRowKey(props.data[i]));
        }
        emit("selectRows", selectedKeys);
      }
    }
  }
  else {
    if (props.selectedRowKeys.includes(newKey) && props.selectedRowKeys.length === 1) {
      emit("selectRows", []);
    }
    else {
      emit("selectRows", [newKey]);
    }
  }
}

function extractRowKey(row: DTableRowData): DTableRowKey {
  const keyColumn = props.columns.find((column) => column.key)!;

  return row[keyColumn.name];
}

function extractSortIcon(column: DTableColumnDefinition) {
  if (!column.sortable) {
    return null;
  }

  if (props.sorting?.name === column.name) {
    return props.sorting.order === "asc"
      ? faArrowUpShortWide
      : faArrowDownWideShort;
  }
  else {
    return faSort;
  }
}

function changeSorting(column: DTableColumnDefinition) {
  if (!props.sorting) {
    return;
  }

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
    display: flex;
    align-items: center;
    padding: tokens.$space-xs tokens.$space-s;
    text-align: var(--text-alignment);
    cursor: pointer;
  }
}
</style>
