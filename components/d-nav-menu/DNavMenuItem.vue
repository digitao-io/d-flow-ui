<template>
  <div
    :class="{ 'd-nav-menu-item__selectedMenu': isSelected}"
  >
    <a
      @click="handleNavigate(props.item.key)"
    >
      {{ item.label }}
    </a>
    <d-menu-list
      v-if="item.children.length !== 0 && isMenuOpen(props.item.key)"
      :items="props.item.children"
      :selected-item="props.selectedItem"
      @navigate="handleNavigate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DMenuList from "./DNavMenuList.vue";

interface MenuEntry {
  key: string;
  label: string;
  icon: string;
  children: MenuEntry[];
}

const props = defineProps<{
  item: MenuEntry;
  selectedItem: string[];
}>();

const emit = defineEmits(["navigate"]);
const isSelected = computed(() => props.selectedItem.includes(props.item.key));
const openMenus = ref<{ [key: string]: boolean }>({});

function handleNavigate(key: string) {
  if (openMenus.value[key] === undefined) {
    openMenus.value[key] = true;
  }
  else {
    openMenus.value[key] = !openMenus.value[key];
  }
  emit("navigate", key);
}

function isMenuOpen(key: string) {
  return openMenus.value[key];
}
</script>

<style lang="scss" scoped>
a:hover {
  background-color: tokens.$color-flavor2l-t1;
}
.d-nav-menu-item__selectedMenu >a {
  background-color: tokens.$color-flavor2l;
}
</style>
