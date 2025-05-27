<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Gebruikers</h2>
            <RouterLink class="btn btn-primary" :to="{ name: 'userCreate' }"
              >Aanmaken</RouterLink
            >
          </div>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
          >
            <table class="table">
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <UsersTableRow
                  v-for="user in users"
                  :key="user.id"
                  :user="user"
                  @user-deleted="removeUser"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToastStore } from "@/stores/toastr";
import { listUsers, type ListUsersResponse } from "@/haag-auth-api";
import UsersTableRow from "@/components/users/UsersTableRow.vue";

const toastStore = useToastStore();

const users = ref<ListUsersResponse>([]);
const loading = ref(true);

const fetchUsers = async () => {
  try {
    const response = await listUsers();
    users.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching users:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van gebruikers.",
      type: "error",
    });
  }
};

function removeUser(id: string) {
  users.value = users.value.filter((user) => user.id !== id);
}

onMounted(async () => {
  await fetchUsers();
});
</script>

<style scoped></style>
