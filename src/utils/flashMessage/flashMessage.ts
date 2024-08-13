// import { FlashMessageOptions } from "./types.d";
import { render, h } from "vue";
import FlashMessage from "@/utils/flashMessage/FlashMessage.vue";
import "./style.css";

interface FlashMessageOptions {
  message: string;
  type: "success" | "error" | "info" | "warning";
}

function notify(params: FlashMessageOptions) {
  const container: HTMLDivElement =
    document.querySelector(`.flash-message-container`) ||
    document.createElement("div");

  if (!document.querySelector(`.flash-message-container`)) {
    container.className = "flash-message-container";
    document.body.appendChild(container);
  }

  const div: HTMLDivElement = document.createElement("div");
  div.style.width = "100%";

  const app = h(FlashMessage, { ...params });
  render(app, div);

  container.appendChild(div);
}

function useNotification() {
  const success = (message: string) => {
    notify({ message, type: "success" });
  };
  return { success };
}

export { notify, useNotification };
export type { FlashMessageOptions };
