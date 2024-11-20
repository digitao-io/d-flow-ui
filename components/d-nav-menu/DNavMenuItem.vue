<template>
  <div
    class="d-nav-menu-item"
  >
    <a
      class="d-nav-menu-item__link"
      :class="{ 'd-nav-menu-item__link--activated': activated }"
      :style="{ '--indent-level': currentPath.length }"
      @click="handleItemClick"
    >
      <font-awesome-icon
        class="d-nav-menu-item__icon"
        :icon="['fas', props.item.icon]"
      />
      <span class="d-nav-menu-item__text">
        {{ props.item.label }}
      </span>
    </a>

    <d-nav-menu
      v-if="hasChildren && expanded"
      class="d-nav-menu-item__sub-menu"
      :items="props.item.children"
      :activated-item="props.activatedItem"
      :parent-path="currentPath"
      @navigate="handleNavigate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { MenuItem } from "./DNavMenu.types";
import DNavMenu from "./DNavMenu.vue";

const props = defineProps<{
  item: MenuItem;
  activatedItem: string[];
  parentPath: string[];
}>();

const emit = defineEmits<{
  navigate: [string[]];
}>();

const hasChildren = computed(() => props.item.children.length > 0);
const currentPath = computed(() => [...props.parentPath, props.item.key]);
const contained = computed(() => {
  for (let i = 0; i < currentPath.value.length; i++) {
    if (props.activatedItem[i] !== currentPath.value[i]) {
      return false;
    }
  }
  return true;
});
const activated = computed(() =>
  props.activatedItem.length === currentPath.value.length && contained.value);

const expanded = ref<boolean>(hasChildren.value && contained.value);

function handleItemClick() {
  if (hasChildren.value) {
    expanded.value = !expanded.value;
  }
  else {
    handleNavigate([]);
  }
}

function handleNavigate(keys: string[]) {
  keys.unshift(props.item.key);
  emit("navigate", keys);
}
</script>

<style lang="scss" scoped>
.d-nav-menu-item {
  &__link {
    @include tokens.typography-text--bold;
    @include tokens.round-edged-block;
    display: block;
    padding: 0 tokens.$space-m;
    padding-left: calc(var(--indent-level) * tokens.$space-m);
    color: tokens.$color-neutral-b;
    line-height: tokens.$input-size;
    cursor: pointer;

    &:hover {
      background-color: tokens.$color-flavor2l-t1;
    }

    &--activated {
      background-color: tokens.$color-flavor2l;
    }
  }

  &__icon {
    display: inline-block;
    padding: 0 tokens.$space-s;
    width: tokens.$font-size-text;
    height: tokens.$font-size-text;
  }
}
</style>
