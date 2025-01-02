<template>
  <div class="d-tab">
    <div class="d-tab__header">
      <button
        v-for="tab of props.tabs"
        :key="tab.name"
        class="d-tab__button"
        :class="{
          'd-tab__button--selected': tab.name === model,
        }"
        @click="selectTab(tab.name)"
      >
        <font-awesome-icon
          class="d-tab__icon"
          :icon="['fas', tab.icon]"
        />
        <span
          v-if="tab.name === model"
          class="d-tab__label"
        >
          {{ tab.label }}
        </span>
      </button>
    </div>
    <div class="d-tab__content">
      <div class="d-tab__content-title">
        {{ selectedTab.label }}
      </div>

      <slot :name="model" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export interface TabDefinition {
  name: string;
  label: string;
  icon: string;
}

const model = defineModel<string>();

const props = defineProps<{
  tabs: TabDefinition[];
}>();

const selectedTab = computed<TabDefinition>(() => props.tabs.find((tab) => tab.name === model.value)!);

function selectTab(name: string) {
  model.value = name;
}
</script>

<style lang="scss" scoped>
.d-tab {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  &__button {
    @include tokens.typography-text-s--bold;
    @include tokens.round-edged-block;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: none;
    padding: 0 tokens.$space-m;
    height: tokens.$input-size-s;

    text-align: start;
    text-transform: uppercase;

    cursor: pointer;

    color: tokens.$color-neutral-b;
    background-color: tokens.$color-flavor1l;

    &:hover {
      background-color: tokens.$color-flavor1l-t2;
    }

    &--selected {
      color: tokens.$color-flavor1;
      background-color: tokens.$color-flavor1l-t3;
    }
  }

  &__icon {
    @include tokens.typography-text;

    &:not(:last-child) {
      margin-right: tokens.$space-s;
    }
  }

  &__content {
    @include tokens.round-edged-block;
    flex: 1 1;
    padding: tokens.$space-m;
    background-color: tokens.$color-flavor1l-t3;
  }

  &__content-title {
    @include tokens.typography-title;
    margin-bottom: tokens.$space-m;
    color: tokens.$color-neutral-b;
  }
}
</style>
