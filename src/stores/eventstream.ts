import { defineStore } from "pinia";
import { ref } from "vue";

export const useEventStreamStore = defineStore("eventStream", () => {
  const baseUrl = ref<string>("");
  const token = ref<string>("");
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

  function onMessagePublished(event: MessageEvent) {
    console.log("Message published event received:", event.data);
    const toastrStore = useToastStore();
    toastrStore.addToast({
      type: "info",
      message: "New message published: " + event.data,
    });
  }

  // Generic handler for errors
  function onError(err: Event) {
    // Optionally, you could trigger a reconnect here
    // For now, just log the error and disconnect
    console.log(err)
    disconnect();
  }

  async function connect(url: string, tkn: string) {
    if (eventSrc.value) {
      eventSrc.value.close();
    }

    baseUrl.value = url;
    token.value = tkn;

    await initiate();
  }

  async function initiate() {
    eventSrc.value = new EventSource(baseUrl.value + "/sse?token=" + token.value);

    eventSrc.value.addEventListener("heartbeat", onHeartbeat);
    eventSrc.value.addEventListener("registration", onRegistration);
    eventSrc.value.addEventListener("message_published", onMessagePublished);
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
    disconnect
  };
});

import { useToastStore } from "./toastr";
