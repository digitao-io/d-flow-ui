<template>
  <div class="d-data-list-album">
    <img
      class="d-data-list-album__image"
      :src="currentImgUrl"
      alt="This is a picture"
    >
    <div
      v-if="props.itemValues.length > 1"
      class="d-data-list-album__pagination"
    >
      <d-icon-button
        icon="fa-angle-left"
        color-theme="form"
        @click="prevImg"
      />
      <span>
        {{ currentIndex + 1 }} / {{ props.itemValues.length }}
      </span>
      <d-icon-button
        icon="fa-angle-right"
        color-theme="form"
        @click="nextImg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { DIconButton } from "../d-icon-button";

library.add(
  faAngleLeft,
  faAngleRight,
);

const props = defineProps<{
  itemValues: string[];
}>();

watch(() => props.itemValues, () => {
  currentIndex.value = 0;
});

const currentIndex = ref<number>(0);
const currentImgUrl = computed<string>(() => props.itemValues[currentIndex.value]);

const prevImg = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
};

const nextImg = () => {
  if (currentIndex.value < props.itemValues.length - 1) {
    currentIndex.value += 1;
  }
};
</script>

<style lang="scss" scoped>
.d-data-list-album {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: tokens.$space-s;
  width: 100%;

  &__image {
    display: block;
    max-width: 100%;
    max-height: 360px;
  }

  &__pagination {
    display: flex;
    gap: tokens.$space-s;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
