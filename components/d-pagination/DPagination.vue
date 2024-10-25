<template>
  <div
    class="d-pagination"
  >
    <d-icon-button
      @click="goToFirstPage"
    >
      <font-awesome-icon :icon="faAnglesLeft" />
    </d-icon-button>
    <d-icon-button
      @click="prevPage"
    >
      <font-awesome-icon :icon="faAngleLeft" />
    </d-icon-button>
    <span
      class="d-pagination__page"
    >
      {{ currentPage }} / {{ props.totalPage }}
    </span>
    <d-icon-button
      @click="nextPage"
    >
      <font-awesome-icon :icon="faAngleRight" />
    </d-icon-button>
    <d-icon-button
      @click="goToLastPage"
    >
      <font-awesome-icon :icon="faAnglesRight" />
    </d-icon-button>
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
import { DIconButton } from "../d-icon-button";

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
.d-pagination__page {
  @include tokens.typography-text--medium;
}
</style>
