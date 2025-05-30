import { ref } from "vue";
import { DNotificationDefinition } from "./DNotification.vue";

export type DNotificationParams = {
  type: "info" | "success" | "warn" | "error";
  title: string;
  message: string;
  dismissInSeconds?: number;
};

const notifications = ref<DNotificationDefinition[]>([]);
const notificationId = ref<number>(1);

function pushNotification(notification: DNotificationParams) {
  const id = notificationId.value;
  notificationId.value++;

  notifications.value = [
    ...notifications.value,
    {
      id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
    },
  ];

  setTimeout(() => {
    const index = notifications.value.findIndex((n) => n.id === id);
    notifications.value.splice(index, 1);
    notifications.value = [...notifications.value];
  }, (notification.dismissInSeconds ?? 5) * 1000);
}

export function useDNotificationPusher() {
  return {
    pushNotification,
  };
}

export function useDNotificationReceiver() {
  return {
    notifications,
  };
}
