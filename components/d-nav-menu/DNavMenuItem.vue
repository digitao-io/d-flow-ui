<template>
  <div
    class="d-nav-menu-item"
    :class="{ 'd-nav-menu-item__selected': selected}"
  >
    <a
      class="d-nav-menu-item__link"
      @click="handleItemClick"
    >
      {{ item.label }}
    </a>

    <d-nav-menu
      v-if="hasChildren && expanded"
      :items="props.item.children"
      :activated-item="props.activatedItem"
      @navigate="handleNavigate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { MenuItem } from "./DNavMenu.types";
import DNavMenu from "./DNavMenu.vue";

const props = defineProps<{
  item: MenuItem;
  activatedItem: string[];
}>();

const emit = defineEmits<{
  navigate: [string[]];
}>();

const hasChildren = computed(() => props.item.children.length > 0);
const selected = computed(() => props.activatedItem.includes(props.item.key));

const expanded = ref<boolean>(hasChildren.value && selected.value);

function handleItemClick() {
  if (hasChildren.value) {
    expanded.value = !expanded.value;
  } else {
    handleNavigate([]);
  }
}

function handleNavigate(keys: string[]) {
  keys.unshift(props.item.key);
  emit("navigate", keys);
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
