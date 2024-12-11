<template>
  <div
    class="d-pagination"
  >
    <d-icon-button
      icon="fa-angles-left"
      @click="goToFirstPage"
    />
    <d-icon-button
      icon="fa-angle-left"
      @click="prevPage"
    />
    <span class="d-pagination__page">
      {{ props.currentPage }} / {{ props.totalPages }}
    </span>
    <d-icon-button
      icon="fa-angle-right"
      @click="nextPage"
    />
    <d-icon-button
      icon="fa-angles-right"
      @click="goToLastPage"
    />
  </div>
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAnglesLeft,
  faAngleLeft,
  faAnglesRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { DIconButton } from "../d-icon-button";

library.add(
  faAnglesLeft,
  faAngleLeft,
  faAnglesRight,
  faAngleRight,
);

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  change: [number];
}>();

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("change", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("change", props.currentPage + 1);
  }
};

const goToFirstPage = () => {
  emit("change", 1);
};

const goToLastPage = () => {
  emit("change", props.totalPages);
};
</script>

<style lang="scss" scoped>
.d-pagination {
  display:flex;
  align-items: center;
  gap: tokens.$space-m;

  &__page {
    @include tokens.typography-text--medium;
    width: 8ch;
    color: tokens.$color-neutral-b;
    text-align: center;
  }
}
</style>
