<!-- Progress.vue -->
<template>
  <div class="w-full mb-2">
    <div
      class="relative w-full h-1 bg-purple-100 rounded cursor-pointer"
      @click="handleClick"
      ref="progressBar"
    >
      <div
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    <div class="flex justify-between mt-1">
      <span class="text-xs text-gray-500">{{ formatTime(currentTime) }}</span>
      <span class="text-xs text-gray-500">{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentTime: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['seek']);

const progress = computed(() => {
  if (props.duration === 0) return 0;
  return (props.currentTime / props.duration) * 100;
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const handleProgressClick = (event) => {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = x / rect.width;
  emit('seek', percentage * props.duration);
};
</script>
