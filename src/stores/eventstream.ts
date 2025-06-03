import { defineStore } from "pinia";
import { ref } from "vue";

export const useEventStreamStore = defineStore("eventStream", () => {
  const eventSrc = ref<EventSource | null>(null);
  const lastHeartbeat = ref<number>(new Date().getTime());

  // Handler for heartbeat event
  function onHeartbeat() {
    lastHeartbeat.value = new Date().getTime();
  }

  // Handler for registration event
  function onRegistration(event: MessageEvent) {
    console.log("Registration event received:", event.data);
    const toastrStore = useToastStore();
    toastrStore.addToast({
      type: "success",
      message: "Registration successful: " + event.data,
    });
  }

  // Generic handler for errors
  function onError(err: Event) {
    // Optionally, you could trigger a reconnect here
  }

  // Setup the EventSource and handlers
  async function connect(baseUrl: string, token: string) {
    if (eventSrc.value) {
      eventSrc.value.close();
    }
    eventSrc.value = new EventSource(baseUrl + "/sse?token=" + token);

    eventSrc.value.addEventListener("heartbeat", onHeartbeat);
    eventSrc.value.addEventListener("registration", onRegistration);
    eventSrc.value.onerror = onError;
  }

  function disconnect() {
    if (eventSrc.value) {
      eventSrc.value.close();
      eventSrc.value = null;
    }
  }

  return {
    eventSrc,
    lastHeartbeat,
    connect,
    disconnect,
  };
});

import { useToastStore } from "./toastr";
