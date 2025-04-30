<template>
  <div class="d-data-list">
    <dl>
      <div
        v-for="item, index in props.dataValues"
        :key="`${item.key}-${index}`"
        class="d-data-list__item"
      >
        <dt
          class="d-data-list__label"
        >
          {{ item.label }}
        </dt>
        <dd class="d-data-list__value">
          <template v-if="item.type === 'text'">
            {{ item.value }}
          </template>

          <template v-else-if="item.type === 'album'">
            <d-data-list-album
              :item-values="item.value"
            />
          </template>

          <template v-else-if="item.type === 'list'">
            <ul class="d-data-list__list">
              <li
                v-for="listItem of (item.value as string[])"
                :key="listItem"
              >
                {{ listItem }}
              </li>
            </ul>
          </template>

          <template v-else-if="item.type === 'markdown'">
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="d-data-list__markdown"
              v-html="marked(item.value)"
            />
            <!-- eslint-enable vue/no-v-html -->
          </template>

          <template v-else-if="item.type === 'slot'">
            <slot
              :name="item.slot!"
              :value="item.value"
            />
          </template>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import DDataListAlbum from "./DDataListAlbum.vue";

export interface DDataListValue {
  key: string;
  label: string;
  type: "text" | "album" | "list" | "markdown" | "slot";
  slot?: string;
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

  &__list {
    margin: 0;
    padding: 0;
    padding-left: tokens.$space-l;
  }

  &__markdown {
    padding: tokens.$space-s tokens.$space-m;
    background-color: tokens.$color-flavor1l-t1;

    :deep() {
      h1, h2, h3, h4, h5, h6, p, ul, ol {
        margin: tokens.$space-s 0 tokens.$space-s 0;
      }

      a {
        color: tokens.$color-flavor1-s1;
      }
    }
  }

  &__value {
    margin-inline-start: 0;
    @include tokens.typography-text--medium;
  }
}
</style>
