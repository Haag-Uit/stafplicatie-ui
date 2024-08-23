<script setup lang="ts">
import { ref, computed } from "vue";
import apiClient from "@/http";
import type { User } from "@/views/User/user.types";

const users = ref<User[]>([]);

apiClient.get("/stafplicatie/v1/user").then((response) => {
  users.value = response.data;
});

const sortedUsers = computed(() => {
  return users.value.sort((a: User, b: User) => {
    return a.email.localeCompare(b.email);
  });
});

function deleteUser(id: number) {
  apiClient
    .delete(`/stafplicatie/v1/user/${id}`)
    .then(() => {
      users.value = users.value.filter((user) => user.id !== id);
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th
              class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
            >
              Email
            </th>
            <th
              class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"
            >
              Rol
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in sortedUsers" :key="user.id">
            <td class="py-5 px-4 xl:pl-11">
              <h5 class="font-medium text-black dark:text-white">
                {{ user.email }}
              </h5>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">
                {{ user.role }}
              </p>
            </td>
            <td class="py-5 px-4">
              <div class="flex items-center space-x-3.5">
                <router-link
                  :to="{
                    name: 'userEdit',
                    params: { id: user.id },
                  }"
                  class="flex"
                >
                  <button class="hover:text-primary">
                    <svg
                      fill="#1C2033"
                      width="18"
                      height="18"
                      version="1.1"
                      id="lni_lni-pencil"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 64 64"
                      xml:space="preserve"
                    >
                      <path
                        d="M61.2,13c-3.2-3.4-6.6-6.8-10-10.1c-0.7-0.7-1.5-1.1-2.4-1.1c-0.9,0-1.8,0.3-2.4,1L8.7,40.2c-0.6,0.6-1,1.3-1.3,2L1.9,59
	c-0.3,0.8-0.1,1.6,0.3,2.2c0.5,0.6,1.2,1,2.1,1h0.4l17.1-5.7c0.8-0.3,1.5-0.7,2-1.3l37.5-37.4c0.6-0.6,1-1.5,1-2.4
	S61.9,13.7,61.2,13z M20.6,52.1c-0.1,0.1-0.2,0.1-0.3,0.2L7.4,56.6l4.3-12.9c0-0.1,0.1-0.2,0.2-0.3L39.4,16l8.7,8.7L20.6,52.1z
	 M51.2,21.5l-8.7-8.7l6.1-6.1c2.9,2.8,5.8,5.8,8.6,8.7L51.2,21.5z"
                      />
                    </svg>
                  </button>
                </router-link>

                <button @click="deleteUser(user.id)" class="hover:text-primary">
                  <svg
                    class="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                      fill=""
                    />
                    <path
                      d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                      fill=""
                    />
                    <path
                      d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                      fill=""
                    />
                    <path
                      d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
