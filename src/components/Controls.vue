<!-- Controls.vue -->
<template>
  <div class="flex items-center justify-center gap-4 py-1">
    <!-- Left side controls -->
    <button
      class="control-button aspect-square"
      @click="$emit('toggleMute')"
      :class="{ 'text-green-500': isMuted }"
    >
      <font-awesome-icon :icon="['fas', isMuted ? 'volume-xmark' : 'volume-high']" class="fa-icon" />
    </button>

    <button
      class="control-button skip-back aspect-square"
      @click="$emit('skipBackward')"
    >
      <font-awesome-icon :icon="['fas', 'rotate-left']" class="fa-icon" />
    </button>

    <!-- Play/Pause button -->
    <button
      class="play-pause-button aspect-square"
      @click="$emit('togglePlay')"
    >
      <font-awesome-icon
        :icon="['fas', isPlaying ? 'pause' : 'play']"
        class="fa-icon"
        :style="{ marginLeft: isPlaying ? '0' : '2px' }"
      />
    </button>

    <!-- Right side controls -->
    <button
      class="control-button skip-forward aspect-square"
      @click="$emit('skipForward')"
    >
      <font-awesome-icon :icon="['fas', 'rotate-right']" class="fa-icon" />
    </button>

    <button
      class="control-button aspect-square"
      @click="$emit('toggleRepeat')"
      :class="{ 'text-green-500': isRepeat }"
    >
      <font-awesome-icon :icon="['fas', 'repeat']" class="fa-icon" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  isPlaying: {
    type: Boolean,
    required: true
  },
  isRepeat: {
    type: Boolean,
    required: true
  },
  isMuted: {
    type: Boolean,
    required: true
  }
});

defineEmits(['togglePlay', 'skipForward', 'skipBackward', 'toggleRepeat', 'toggleMute']);
</script>
