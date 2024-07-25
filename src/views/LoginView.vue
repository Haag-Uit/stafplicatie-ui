<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const email = ref("huisicter@haaguit.com");
const password = ref("SomethingDifficult");
function login() {
  authStore.login(email.value, password.value);
}
</script>

<template>
  <main class="bg-slate-700 h-full flex flex-col justify-center">
    <div class="w-1/3 mx-auto border-2 rounded">
      <div class="flex justify-center p-4">
        <h1 class="text-2xl font-bold text-gray-300">Login</h1>
      </div>
      <div>
        <div class="p-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            v-model="email"
            class="w-full p-2"
          />
        </div>
        <div class="p-4">
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            placeholder="Password"
            class="w-full p-2"
          />
        </div>
        <div class="p-4">
          <button @click="login" class="p-2 w-full bg-gray-300 rounded">
            Login
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
