import { ref } from "vue";
import { defineStore } from "pinia";
export const useLayoutStore = defineStore("layout", () => {
  interface LayoutState {
    sidebarOpen: boolean;
  }
  const layoutState = ref<LayoutState>(
    JSON.parse(localStorage.getItem("layoutState")!) || {
      sidebarOpen: true,
    }
  );

  function toggleSidebar() {
    layoutState.value.sidebarOpen = !layoutState.value.sidebarOpen;
  }
  return { layoutState, toggleSidebar };
});
