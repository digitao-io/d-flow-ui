<template>
  <div
    class="d-pagination"
  >
    <button
      class="d-pagination__front"
      :disabled="currentPage === 1"
      @click="goToFirstPage"
    >
      <font-awesome-icon :icon="faAnglesLeft" />
    </button>
    <button
      class="d-pagination__previous"
      :disabled="currentPage <= 1"
      @click="prevPage"
    >
      <font-awesome-icon :icon="faAngleLeft" />
    </button>
    <span
      class="d-pagination__page"
    >
      {{ currentPage }} / {{ props.totalPage }}
    </span>
    <button
      class="d-pagination__next"
      :disabled="currentPage >= props.totalPage"
      @click="nextPage"
    >
      <font-awesome-icon :icon="faAngleRight" />
    </button>
    <button
      class="d-pagination__last"
      :disabled="currentPage === props.totalPage"
      @click="goToLastPage"
    >
      <font-awesome-icon :icon="faAnglesRight" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAnglesLeft,
  faAngleLeft,
  faAnglesRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  totalPage: number;
  currentPage: number;
}>();

const currentPage = ref<number>(props.currentPage);

watch(() => props.currentPage, (newVal: number) => {
  currentPage.value = newVal;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < props.totalPage) {
    currentPage.value += 1;
  }
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToLastPage = () => {
  currentPage.value = props.totalPage;
};
</script>

<style lang="scss" scoped>
.d-pagination {
  display:flex;
  align-items: center;
  gap: tokens.$space-m
}
.d-pagination__front,
.d-pagination__next,
.d-pagination__previous,
.d-pagination__last,
.d-pagination__end {
  width: tokens.$input-size;
  height: tokens.$input-size;
  border-radius: 50%;
  border: none;
  background-color: tokens.$color-flavor2l;
  color: black;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }

  &:hover,
  &:active {
      background-color: tokens.$color-flavor2l-t1;
  }
}
.d-pagination__page {
  @include tokens.typography-text--medium;
}
</style>
