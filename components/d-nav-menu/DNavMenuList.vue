<template>
  <ul>
    <li
      v-for="item in props.items"
      :key="item.key"
    >
      <d-menu-item
        :item="item"
        :selected-item="props.selectedItem"
        @navigate="handleNavigate"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import DMenuItem from "./DNavMenuItem.vue";

interface MenuEntry {
  key: string;
  label: string;
  icon: string;
  children: MenuEntry[];
}

const props = defineProps<{
  items: MenuEntry[];
  selectedItem: string[];
}>();

const emit = defineEmits(["navigate"]);

function handleNavigate(key: string) {
  emit("navigate", key);
}
</script>

<style lang="scss" scoped>
.d-nav-menu ul,li {
  list-style-type: none;
}
</style>
