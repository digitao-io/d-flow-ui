<template>
  {{ notifications }}
  <ul class="d-notification">
    <li
      v-for="notification of notifications"
      :key="notification.id"
      class="d-notification__item"
      :class="`d-notification__item--${notification.type}`"
    >
      <div>
        <font-awesome-icon
          v-if="notification.type === 'info'"
          class="d-notification__icon"
          :icon="faCircleInfo"
        />
        <font-awesome-icon
          v-else-if="notification.type === 'success'"
          class="d-notification__icon"
          :icon="faCircleCheck"
        />
        <font-awesome-icon
          v-else-if="notification.type === 'warn'"
          class="d-notification__icon"
          :icon="faCircleExclamation"
        />
        <font-awesome-icon
          v-else-if="notification.type === 'error'"
          class="d-notification__icon"
          :icon="faSkull"
        />
      </div>

      <div class="d-notification__text-area">
        <div class="d-notification__title">
          {{ notification.title }}
        </div>

        <div class="d-notification__message">
          {{ notification.message }}
        </div>
      </div>

      <button
        class="d-notification__dismiss-button"
        @click="onDismiss(notification.id)"
      >
        <font-awesome-icon
          :icon="faCircleXmark"
        />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleExclamation,
  faSkull,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDNotificationInternally } from "./DNotificationController";

export type DNotificationDefinition = {
  id: number;
  type: "info" | "success" | "warn" | "error";
  title: string;
  message: string;
};

const { notifications } = useDNotificationInternally();

function onDismiss(id: number) {
  const index = notifications.value.findIndex((n) => n.id === id);
  notifications.value.splice(index, 1);
  notifications.value = [...notifications.value];
}
</script>

<style scoped lang="scss">
.d-notification {
  position: fixed;
  bottom: tokens.$space-l;
  right: tokens.$space-l;

  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    @include tokens.round-edged-block;
    position: relative;
    display: flex;
    align-items: center;
    gap: tokens.$space-m;
    margin-bottom: tokens.$space-m;
    border-left: 8px solid tokens.$color-flavor1;
    padding: tokens.$space-m;
    color: tokens.$color-neutral-b;
    background-color: tokens.$color-neutral-w;
    box-shadow: tokens.$box-shadow-l1;
  }

  &__item--info {
    border-left-color: tokens.$color-info;
    .d-notification__icon,
    .d-notification__dismiss-button {
      color: tokens.$color-info;
    }
  }
  &__item--success {
    border-left-color: tokens.$color-success;
    .d-notification__icon,
    .d-notification__dismiss-button {
      color: tokens.$color-success;
    }
  }
  &__item--warn {
    border-left-color: tokens.$color-warn;
    .d-notification__icon,
    .d-notification__dismiss-button {
      color: tokens.$color-warn;
    }
  }
  &__item--error {
    border-left-color: tokens.$color-error;
    .d-notification__icon,
    .d-notification__dismiss-button {
      color: tokens.$color-error;
    }
  }

  &__icon {
    width: 50px;
    height: 50px;
  }

  &__text-area {
    width: 250px;
  }

  &__title {
    @include tokens.typography-text--bold;
  }

  &__message {
    @include tokens.typography-text-s;
  }

  &__dismiss-button {
    @include tokens.typography-text-l;
    position: absolute;
    top: tokens.$space-s;
    right: tokens.$space-s;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    line-height: 1;
    cursor: pointer;
  }
}
</style>
