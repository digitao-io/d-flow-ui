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
        <dd class="d-data-list__value">
          <template v-if="item.type === 'image'">
            <img
              :src="item.value"
              alt="This is a picture"
              class="d-data-list__thumbnail"
            >
          </template>

          <template v-else-if="item.type === 'list'">
            <ul class="d-data-list__item-list">
              <li
                v-for="listItem of (item.value as string[])"
                :key="listItem"
              >
                {{ listItem }}
              </li>
            </ul>
          </template>

          <template v-else-if="item.type === 'slot'">
            <slot :name="item.key" />
          </template>

          <template v-else>
            {{ item.value }}
          </template>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
export interface DDataListValue {
  key: string;
  label: string;
  type: "text" | "image" | "slot" | "list";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

const props = defineProps<{
  dataValues: DDataListValue[];
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
    color: tokens.$color-neutral-g;
    text-transform: uppercase;
  }

  &__thumbnail {
    display: block;
    max-width: 100%;
    max-height: 360px;
  }

  &__item-list {
    margin: 0;
    padding: 0;
    padding-left: tokens.$space-l;
  }

  &__value {
    margin-inline-start: 0;
    @include tokens.typography-text--medium;
  }
}
</style>
