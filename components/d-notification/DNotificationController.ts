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
  console.log(notification);
  const id = notificationId.value;
  notificationId.value++;

  console.log(uuid(notifications));

  notifications.value = [
    ...notifications.value,
    {
      id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
    },
  ];

  /*
  setTimeout(() => {
    const index = notifications.value.findIndex((n) => n.id === id);
    notifications.value.splice(index, 1);
    notifications.value = [...notifications.value];
  }, (notification.dismissInSeconds ?? 5) * 1000);
  */
}

export function useDNotification() {
  console.log(uuid(notifications));
  return {
    pushNotification,
  };
}

export function useDNotificationInternally() {
  console.log(uuid(notifications));
  return {
    pushNotification,
    notifications,
  };
}

const uuid = (() => {
  let currentId = 0;
  const map = new WeakMap();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: any) => {
    if (!map.has(object)) {
      map.set(object, ++currentId);
    }

    return map.get(object);
  };
})();
