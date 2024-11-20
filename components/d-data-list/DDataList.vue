<template>
  <div class="d-data-list">
    <dl>
      <div
        v-for="item in props.dataValues"
        :key="item.key"
        class="d-data-list__item"
      >
        <dt
          class="d-data-list__label"
        >
          {{ item.label }}
        </dt>
        <dd
          v-if="item.type === 'image'"
          class="d-data-list__value"
        >
          <img
            :src="item.value"
            alt="This is a picture"
            class="d-data-list__thumbnail"
          >
        </dd>
        <dd
          v-else
          class="d-data-list__value"
        >
          {{ item.value }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
interface DataValue {
  key: string;
  label: string;
  value: string;
  type: "text" | "image";
}

const props = defineProps<{
  dataValues: DataValue[];
}>();
</script>

<style lang="scss" scoped>
.d-data-list {
  color: tokens.$color-neutral-b;

  &__item {
    margin-bottom: tokens.$space-m;
  }

  &__label {
    @include tokens.typography-text-s--bold;
  }

  &__thumbnail {
    display: block;
    max-width: 100%;
    max-height: 360px;
  }

  &__value {
    margin-inline-start: 0;
    @include tokens.typography-text--medium;
  }
}
</style>
