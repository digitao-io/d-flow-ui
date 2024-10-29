<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in props.columns"
          :key="column.label"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
      >
        <td
          v-for="column in props.columns"
          :key="column.name"
        >
          {{ row[column.name] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface ColumnDefinition {
  key: boolean;
  name: string;
  label: string;
  sortable: boolean;
  widthInPercent: string;
  minWidthInPixels: string;
  data: string;
  titleAlignment: "start" | "center" | "end";
}

const props = defineProps<{
  columns: ColumnDefinition[];
  data: Record<string, string | number | boolean | null>[];
}>();
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
