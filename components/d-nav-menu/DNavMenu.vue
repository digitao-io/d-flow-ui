<template>
  <ul class="d-nav-menu">
    <li
      v-for="item in props.items"
      :key="item.key"
      class="d-nav-menu__item-container"
    >
      <d-nav-menu-item
        :item="item"
        :activated-item="props.activatedItem"
        :parent-path="props.parentPath ?? []"
        @navigate="handleNavigate"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { MenuItem } from "./DNavMenu.types";
import DNavMenuItem from "./DNavMenuItem.vue";

const props = defineProps<{
  items: MenuItem[];
  activatedItem: string[];
  parentPath?: string[];
}>();

const emit = defineEmits(["navigate"]);

function handleNavigate(keys: string[]) {
  emit("navigate", keys);
}
</script>

<style lang="scss" scoped>
.d-nav-menu {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
