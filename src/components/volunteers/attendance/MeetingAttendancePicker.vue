<script lang="ts" setup>

import { ref, watch } from "vue";

const props = defineProps({
  volunteerId: {
    type: Number,
    required: true,
  },
  meeting: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'updateStatus', status: number): void;
}>();

const state = ref(props.status);

watch(state, (newValue) => {
  emit('updateStatus', props.meeting, newValue);
});

</script>
<template>
  <div>
    <input type="radio" :name="`radio-${props.meeting}-${props.volunteerId}`" class="radio radio-secondary mr-2"
      v-model="state" :value=0 />
    <input type="radio" :name="`radio-${props.meeting}-${props.volunteerId}`" class="radio radio-success mr-2"
      v-model="state" :value=1 />
    <input type="radio" :name="`radio-${props.meeting}-${props.volunteerId}`" class="radio radio-warning mr-2"
      v-model="state" :value=2 />
    <input type="radio" :name="`radio-${props.meeting}-${props.volunteerId}`" class="radio radio-error" v-model="state"
      :value=3 />
  </div>
</template>
