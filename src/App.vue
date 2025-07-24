<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { client } from "./client/client.gen";
import { client as haagAuthClient } from "@/haag-auth-api/client.gen";
import { client as relationsClient } from "@/relations-api/client.gen";
import { client as volunteersClient } from "@/volunteers-api/client.gen";
import { CalendarDays, LayoutDashboard, Users } from "lucide-vue-next";
import SidebarFooter from "./components/layout/SidebarFooter.vue";
import ToastrContainer from "./components/ToastrContainer.vue";
const auth0 = useAuth0();

const clientReady = ref(false);

const initiateClient = async () => {
  try {
    const accessToken = await auth0.getAccessTokenSilently();
    client.setConfig({
      baseUrl: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    haagAuthClient.setConfig({
      baseUrl: import.meta.env.VITE_HAAG_AUTH_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    relationsClient.setConfig({
      baseUrl: import.meta.env.VITE_RELATIONS_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    volunteersClient.setConfig({
      baseUrl: import.meta.env.VITE_VOLUNTEERS_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    clientReady.value = true;
  } catch (error) {
    console.error("Error setting access token:", error);
  }
};

const sidebarOpen = ref(true);
const isMobile = ref(false);
const isLoading = computed(() => auth0.isLoading && !clientReady.value);
const nickname = computed(() => {
  if (auth0.user.value) {
    // capitalize first letter of nickname
    const name = auth0.user.value.nickname ?? "Loading";
    const firstLetter = name.charAt(0).toUpperCase();
    const restOfName = name.slice(1);

    return `${firstLetter}${restOfName}`;
  }
  return "Loading";
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) sidebarOpen.value = false;
  else sidebarOpen.value = true;
};

onMounted(async () => {
  handleResize();
  window.addEventListener("resize", handleResize);
  await initiateClient();
});

watch(
  () => auth0.isLoading,
  (newValue) => {
    if (!newValue) {
      initiateClient();
    }
  }
);
</script>

<template>
  <div
    v-if="isLoading || !clientReady"
    class="flex h-screen items-center justify-center"
  >
    <div class="loading loading-spinner loading-lg"></div>
  </div>
  <div v-else class="flex h-screen bg-base-200">
    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="sidebarOpen"
        class="w-64 bg-base-100 shadow-lg border-e border-base-300 p-4 fixed md:static z-20 md:z-auto h-full transition-all duration-300"
      >
        <div class="flex flex-col content-between h-full">
          <div class="grow">
            <div
              class="text-xl font-bold border-b-1 border-base-200 flex justify-center"
            >
              <img
                src="/logo_stafplicatie.png"
                alt="Stafplicatie"
                class="h-12"
              />
            </div>
            <ul class="menu w-full">
              <li class="menu-title">Algemeen</li>
              <li>
                <RouterLink to="/"><LayoutDashboard /> Dashboard</RouterLink>
                <RouterLink to="/kampjaar">
                  <CalendarDays /> Kampjaren
                </RouterLink>
                <RouterLink to="/inschrijving">
                  <Users /> Inschrijvingen
                </RouterLink>
              </li>
            </ul>
            <div class="mt-2">
              <ul class="menu w-full">
                <li class="menu-title">Medewerkers</li>
                <li>
                  <RouterLink to="/medewerker"
                    ><Users /> Medewerkers
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div class="mt-2">
              <ul class="menu w-full">
                <li class="menu-title">Beheer</li>
                <li>
                  <RouterLink to="/gebruiker"><Users /> Gebruikers </RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <SidebarFooter />
        </div>
      </aside>
    </transition>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen && isMobile"
      class="fixed inset-0 bg-black opacity-30 z-10"
      @click="toggleSidebar"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <nav class="navbar bg-base-100 border-b-1 border-base-300 px-4">
        <div class="flex-1">
          <button class="btn btn-ghost md:hidden" @click="toggleSidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div></div>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost">
              <div class="avatar">
                <div class="w-8 rounded-full">
                  <img :src="auth0.user?.value?.picture" />
                </div>
              </div>
              <div class="-space-y-0.5 text-start">
                <p class="text-sm">
                  {{ nickname }}
                </p>
                <p class="text-xs text-base-content/60">settings</p>
              </div>
            </div>
            <ul
              tabindex="0"
              class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li><a @click="auth0.logout()">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <main class="p-6 overflow-y-scroll">
        <RouterView />
      </main>
    </div>
    <ToastrContainer />
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
