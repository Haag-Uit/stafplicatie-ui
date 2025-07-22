<template>
  <div class="form-control w-full relative">
    <div class="join w-full">
      <input
        v-model="inputValue"
        type="text"
        placeholder="Zoek email..."
        class="input input-bordered join-item flex-1"
        :class="{ 'input-error': hasError }"
        @input="onInputChange"
        @focus="showDropdown = true"
      />
      <button
        class="btn btn-primary join-item"
        :disabled="searchResults.length > 0 || !hasSearched"
        @click="emit('create', inputValue)"
      >
        <span>Aanmaken</span>
      </button>
    </div>

    <!-- Dropdown Results -->
    <ul
      v-if="showDropdown && (hasSearched || hasError || isLoading)"
      class="menu bg-base-100 border border-base-300 rounded-box mt-1 w-full max-h-60 overflow-auto shadow-lg z-50"
    >
      <!-- Loading State -->
      <li v-if="isLoading" class="p-4 text-center">
        <span class="loading loading-spinner loading-sm"></span>
        <span class="ml-2">Zoeken...</span>
      </li>

      <!-- Error State -->
      <li v-else-if="hasError" class="p-4 text-error">
        <span>Er is een fout opgetreden bij het zoeken</span>
      </li>

      <!-- No Results -->
      <li
        v-else-if="searchResults.length === 0 && hasSearched"
        class="p-4 text-base-content/70"
      >
        <span>Geen resultaten gevonden</span>
      </li>

      <!-- Results -->
      <li
        v-for="result in searchResults"
        :key="result.id"
        @mousedown.prevent="selectPerson(result)"
        class="hover:bg-base-200 cursor-pointer"
      >
        <a class="px-4 py-2">
          {{ result.email }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { searchPersons, type PersonPersonSearchResult } from "@/relations-api";

// Emits
interface Emits {
  (e: "create", email: string): void;
  (e: "select", personId: number): void;
}

const emit = defineEmits<Emits>();

// Reactive state
const inputValue = ref("");
const searchResults = ref<PersonPersonSearchResult[]>([]);
const showDropdown = ref(false);
const isLoading = ref(false);
const hasError = ref(false);
const hasSearched = ref(false);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

// Input change handler with debouncing
const onInputChange = () => {
  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Reset states
  hasError.value = false;
  searchResults.value = [];
  showDropdown.value = true;

  // Don't search if input is too short
  if (inputValue.value.trim().length < 3) {
    hasSearched.value = false;
    return;
  }

  // Set up new timeout for 2 seconds
  searchTimeout = setTimeout(() => {
    performSearch();
  }, 500);
};

// Perform the actual search
const performSearch = async () => {
  const searchTerm = inputValue.value.trim();

  if (!searchTerm || searchTerm.length < 3) {
    return;
  }

  isLoading.value = true;
  hasError.value = false;
  hasSearched.value = true;
  showDropdown.value = true;

  try {
    const { data, error } = await searchPersons({
      body: {
        email: searchTerm,
      },
    });

    if (error) {
      console.error("Search error:", error);
      hasError.value = true;
      searchResults.value = [];
    } else {
      searchResults.value = data?.results || [];
    }
  } catch (err) {
    console.error("Search exception:", err);
    hasError.value = true;
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Handle person selection
const selectPerson = (person: PersonPersonSearchResult) => {
  if (person.id && person.email) {
    emit("select", person.id);
    inputValue.value = person.email;
    showDropdown.value = false;
    searchResults.value = [];
  }
};
</script>

<style scoped></style>
