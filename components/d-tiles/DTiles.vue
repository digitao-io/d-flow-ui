<template>
  <ul
    class="d-tiles"
    :style="{
      '--tile-width': props.tileWidth,
      '--tile-height': props.tileHeight,
      '--tile-gap': props.tileGap,
    }"
  >
    <li
      v-for="item of props.data"
      :key="props.keyExtractor(item)"
      class="d-tiles__item-container"
    >
      <button
        class="d-tiles__item"
        :class="{
          'd-tiles__item--selected': matchItemKey(props.keyExtractor(item), props.selectedTileKey),
        }"
        type="button"
        @click="onItemClick(props.keyExtractor(item))"
      >
        <slot
          name="tile"
          :data="item"
        />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
export type DTilesItemFieldValue = string | number | boolean | null;
export type DTilesItemKey = DTilesItemFieldValue | DTilesItemFieldValue[];
export type DTilesItemData = Record<string, DTilesItemFieldValue>;

const props = defineProps<{
  tileWidth: string;
  tileHeight: string;
  tileGap: string;
  keyExtractor: (item: DTilesItemData) => DTilesItemKey;
  data: DTilesItemData[];
  selectedTileKey: DTileItemKey;
}>();

const emit = defineEmits<{
  selectTile: [DTilesItemKey];
}>();

function matchItemKey(key1: DTilesItemKey, key2: DTilesItemKey): boolean {
  return JSON.stringify(key1) === JSON.stringify(key2);
}

function onItemClick(key: DTilesItemKey) {
  emit("selectTile", key);
}
</script>

<style lang="scss" scoped>
.d-tiles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--tile-gap);
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    @include tokens.typography-text;
    @include tokens.round-edged-block;
    display: block;
    margin: 0;
    width: var(--tile-width);
    height: var(--tile-height);
    border: none;
    padding: 0;
    overflow: hidden;
    text-align: start;
    background-color: tokens.$color-neutral-g-t2;
    cursor: pointer;

    &:hover {
      background-color: tokens.$color-flavor1l-t2;
      box-shadow: tokens.$box-shadow-l1;
    }

    &.d-tiles__item--selected {
      background-color: tokens.$color-flavor1l;
      box-shadow: tokens.$box-shadow-l1;
    }
  }
}
</style>
