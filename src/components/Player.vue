<!-- Player.vue -->
<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- Menu Button -->
    <div class="absolute top-4 right-4 menu-container">
      <button
        @click.stop="toggleMenu"
        class="menu-button"
      >
        <font-awesome-icon
          :icon="['fas', 'ellipsis-vertical']"
          class="fa-icon text-zinc-400 transition-opacity hover:opacity-100"
          style="opacity: 0.7;"
        />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-show="isMenuOpen"
        class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5 z-50"
      >
        <div class="py-1">
          <button
            @click="downloadSong"
            class="flex items-center w-full px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all duration-150 cursor-pointer active:bg-zinc-600"
          >
            <font-awesome-icon :icon="['fas', 'download']" class="mr-3 w-4 h-4" />
            Download song
          </button>
          <button
            @click="shareLink"
            class="flex items-center w-full px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all duration-150 cursor-pointer active:bg-zinc-600"
          >
            <font-awesome-icon :icon="['fas', 'share']" class="mr-3 w-4 h-4" />
            Share link
          </button>
        </div>
      </div>
    </div>

    <!-- Album Cover and Info -->
    <div class="flex-1 flex items-center justify-center -mt-20">
      <div class="text-center">
        <img
          :src="getAssetUrl('album-cover.jpg')"
          alt="Album Cover"
          class="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-lg shadow-xl mb-6 mx-auto"
        />
        <h3 class="text-xl md:text-2xl font-medium mb-2">Beginning of March</h3>
        <p class="text-sm md:text-base text-zinc-400">scarlooo</p>
      </div>
    </div>

    <!-- Player Controls -->
    <div class="player-container">
      <div class="max-w-screen-lg mx-auto px-4 md:px-8 py-4">
        <Progress
          :current-time="currentTime"
          :duration="maxDuration"
          @seek="handleSeek"
        />
        <Controls
          :is-playing="isPlaying"
          :is-repeat="isRepeat"
          :is-muted="isMuted"
          @toggle-play="togglePlay"
          @skip-forward="skipForward"
          @skip-backward="skipBackward"
          @toggle-repeat="toggleRepeat"
          @toggle-mute="toggleMute"
        />
      </div>
    </div>

    <!-- Hidden audio element -->
    <audio
      ref="audioElement"
      :src="audioSource"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
    ></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Controls from './Controls.vue';
import Progress from './Progress.vue';

// Constants
const MAX_DURATION = 177; // 2:57 in seconds

// Get base URL for assets
const getAssetUrl = (path) => {
  return import.meta.env.BASE_URL + path;
};

// Audio state
const audioSource = getAssetUrl('demo-song.mp3');
const isPlaying = ref(false);
const isRepeat = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const maxDuration = ref(MAX_DURATION);
const isMenuOpen = ref(false);

// Track info
const albumCover = ref(getAssetUrl('album-cover.jpg'));

// Menu functions
const toggleMenu = (event) => {
  event.stopPropagation();
  isMenuOpen.value = !isMenuOpen.value;
};

const downloadSong = () => {
  const link = document.createElement('a');
  link.href = getAssetUrl('demo-song.mp3');
  link.download = 'Beginning of March.mp3';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  isMenuOpen.value = false;
};

const shareLink = () => {
  // Get the base URL of the current page
  const baseUrl = window.location.origin + import.meta.env.BASE_URL;
  // Create a clean URL with the desired filename
  const directMp3Url = `${baseUrl}beginning-of-march.mp3`;

  if (navigator.share) {
    navigator.share({
      title: 'Beginning of March - scarlooo',
      text: 'Listen to Beginning of March:',
      url: directMp3Url
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(directMp3Url)
      .then(() => alert('Link copied to clipboard!'))
      .catch(console.error);
  }
  isMenuOpen.value = false;
};

// Click outside to close menu
const handleClickOutside = (event) => {
  if (isMenuOpen.value && !event.target.closest('.menu-container')) {
    isMenuOpen.value = false;
  }
};

// Audio event listeners
const updateTime = () => {
  if (audio.currentTime >= MAX_DURATION) {
    audio.currentTime = MAX_DURATION;
    audio.pause();
    isPlaying.value = false;
    if (isRepeat.value) {
      audio.currentTime = 0;
      audio.play();
      isPlaying.value = true;
    }
    return;
  }
  currentTime.value = Math.min(audio.currentTime, MAX_DURATION);
};

const updateDuration = () => {
  duration.value = audio.duration;
};

const handleEnded = () => {
  if (isRepeat.value) {
    audio.currentTime = 0;
    audio.play();
  } else {
    isPlaying.value = false;
  }
};

// Player controls
const togglePlay = () => {
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
};

const skipForward = () => {
  audio.currentTime = Math.min(audio.currentTime + 10, MAX_DURATION);
};

const skipBackward = () => {
  audio.currentTime = Math.max(audio.currentTime - 10, 0);
};

const toggleRepeat = () => {
  isRepeat.value = !isRepeat.value;
};

const toggleMute = () => {
  audio.muted = !audio.muted;
  isMuted.value = audio.muted;
};

const handleSeek = (time) => {
  audio.currentTime = Math.min(time, MAX_DURATION);
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('ended', handleEnded);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  audio.removeEventListener('timeupdate', updateTime);
  audio.removeEventListener('loadedmetadata', updateDuration);
  audio.removeEventListener('ended', handleEnded);
  audio.pause();
});
</script>
