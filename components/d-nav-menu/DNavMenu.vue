<template>
  <div>
    <d-menu-list
      :items="props.menuItems"
      :selected-item="props.activatedItem"
      @navigate="handleNavigate"
    />
  </div>
  <p>{{ activatedItem }}</p>
</template>

<script setup lang="ts">
import DMenuList from "./DNavMenuList.vue";

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  children: MenuItem[];
}

const props = defineProps<{
  menuItems: MenuItem[];
  activatedItem: string[];
}>();

const emit = defineEmits(["navigate"]);

function handleNavigate(key: string) {
  emit("navigate", key);
}
</script>
