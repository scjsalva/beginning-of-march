<!-- Progress.vue -->
<template>
  <div class="flex items-center gap-2 w-full my-4">
    <span class="text-xs md:text-sm text-zinc-400 w-12 md:w-14 text-right">{{ formatTime(currentTime) }}</span>
    <div
      class="progress-bar flex-1"
      ref="progressBar"
      @click="handleProgressClick"
    >
      <div
        class="progress-bar-fill"
        :style="{ width: `${progress}%` }"
      >
        <div class="progress-bar-handle"></div>
      </div>
    </div>
    <span class="text-xs md:text-sm text-zinc-400 w-12 md:w-14">{{ formatTime(duration) }}</span>
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
