<!-- Player.vue -->
<template>
  <div class="min-h-screen flex flex-col relative cursor-pointer bg-gradient-to-br from-pink-100 to-purple-100">
    <!-- Background Grid -->
    <div class="fixed inset-0">
      <div class="absolute inset-0" @click="showAlbum = true">
        <PinterestGrid
          :items="backgroundImages"
          @item-click="() => showAlbum = true"
        />
        <div
          class="absolute inset-0 bg-gradient-to-br transition-all duration-300"
          :class="[
            showAlbum
              ? 'from-pink-100/80 to-purple-100/80 backdrop-blur-sm'
              : 'from-pink-100/10 to-purple-100/10'
          ]"
        ></div>
      </div>
    </div>

    <!-- Message Button -->
    <div class="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg" @click="showMessage = true">
      <button class="p-2 rounded-full hover:bg-white/50 transition-colors text-gray-700 flex items-center gap-2">
        <font-awesome-icon :icon="['fas', 'envelope']" class="w-4 h-4" />
        <span class="text-sm font-medium">For You</span>
      </button>
    </div>

    <!-- Menu Button -->
    <div class="absolute top-4 right-4 menu-container z-10 bg-white p-2 rounded-full aspect-square flex items-center justify-center" @click.stop="toggleMenu">
      <button class="menu-button">
        <font-awesome-icon
          :icon="['fas', 'ellipsis-vertical']"
          class="fa-icon text-gray-600 transition-opacity hover:opacity-100"
          style="opacity: 0.7;"
        />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-show="isMenuOpen"
        class="absolute right-0 mt-40 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
      >
        <div class="py-1">
          <button
            @click="downloadSong"
            class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-150 cursor-pointer active:bg-purple-100"
          >
            <font-awesome-icon :icon="['fas', 'download']" class="mr-3 w-4 h-4" />
            Download song
          </button>
          <button
            @click="shareLink"
            class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-150 cursor-pointer active:bg-purple-100"
          >
            <font-awesome-icon :icon="['fas', 'share']" class="mr-3 w-4 h-4" />
            Share link
          </button>
        </div>
      </div>
    </div>

    <!-- Album Cover and Info -->
    <div
      class="flex-1 flex items-center justify-center -mt-20 z-40 transition-all duration-300"
      :class="{ 'opacity-0 pointer-events-none': !showAlbum }"
      @click="showAlbum = false"
    >
      <div class="text-center cursor-pointer">
        <img
          :src="getAssetUrl('album-cover.jpg')"
          alt="Album Cover"
          class="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-lg shadow-xl mb-6 mx-auto"
        />
        <h3 class="text-xl md:text-2xl font-medium mb-2 text-gray-800">Beginning of March</h3>
        <p class="text-sm md:text-base text-gray-500">scarlooo</p>
      </div>
    </div>

    <!-- Player Controls -->
    <div class="player-container bg-white backdrop-blur-sm shadow-lg z-10">
      <div class="max-w-screen-lg mx-auto px-4 md:px-8 py-4 bg-white">
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

    <!-- Message Modal -->
    <div
      v-if="showMessage"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      @click="showMessage = false"
    >
      <div
        class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8"
        @click.stop
      >
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            A Letter For You
          </h2>
          <button
            @click="showMessage = false"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" class="w-5 h-5" />
          </button>
        </div>

        <div class="prose prose-zinc max-w-none">
          <p class="text-gray-600 leading-relaxed">
            Dear Jaii,
          </p>
          <p class="text-gray-600 leading-relaxed mt-4">
            [Your heartfelt message will go here...]
          </p>
          <p class="text-gray-600 leading-relaxed mt-4">
            With love,<br>
            Your Secret Admirer
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Controls from '../components/Controls.vue';
import Progress from '../components/Progress.vue';
import PinterestGrid from '../components/PinterestGrid.vue';

// Constants
const MAX_DURATION = 177; // 2:57 in seconds

// UI State
const showAlbum = ref(true);

// Get base URL for assets
const getAssetUrl = (path) => {
  return import.meta.env.BASE_URL + path;
};

// Audio element ref
const audioElement = ref(null);

// Audio state
const audioSource = getAssetUrl('demo-song.mp3');
const isPlaying = ref(false);
const isRepeat = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const maxDuration = ref(MAX_DURATION);
const isMenuOpen = ref(false);
const showMessage = ref(false);

// Track info
const albumCover = ref(getAssetUrl('album-cover.jpg'));

// Background images
const backgroundImages = ref([])
const allImages = ref([])  // Store all possible images
const isLoading = ref(true)

// Grid configuration based on screen size
const GRID_COLUMNS = {
  mobile: 5,    // Default
  tablet: 6,    // >= 640px
  desktop: 10,  // >= 1024px
  wide: 12      // >= 1536px
}

const getGridColumns = () => {
  if (window.innerWidth >= 1536) return GRID_COLUMNS.wide
  if (window.innerWidth >= 1024) return GRID_COLUMNS.desktop
  if (window.innerWidth >= 640) return GRID_COLUMNS.tablet
  return GRID_COLUMNS.mobile
}

const getAdjacentTileIndices = (index) => {
  const columns = getGridColumns()
  const row = Math.floor(index / columns)
  const col = index % columns

  // Get indices of adjacent tiles (up, right, down, left)
  const adjacent = []

  // Up
  if (row > 0) adjacent.push(index - columns)
  // Right
  if (col < columns - 1) adjacent.push(index + 1)
  // Down
  if (row < Math.floor(backgroundImages.value.length / columns) - 1) adjacent.push(index + columns)
  // Left
  if (col > 0) adjacent.push(index - 1)

  return adjacent
}

const getValidRandomImage = (index) => {
  if (allImages.value.length === 0) return null

  // Get current images in adjacent tiles
  const adjacentIndices = getAdjacentTileIndices(index)
  const adjacentImages = adjacentIndices
    .map(i => backgroundImages.value[i]?.imageUrl)
    .filter(Boolean)

  // Filter out images that are in adjacent tiles
  const validImages = allImages.value.filter(imageUrl => {
    const optimizedUrl = getOptimizedImageUrl(imageUrl).mobile
    return !adjacentImages.includes(optimizedUrl)
  })

  // If no valid images (shouldn't happen with enough images), return any random image
  if (validImages.length === 0) return allImages.value[Math.floor(Math.random() * allImages.value.length)]

  // Return a random valid image
  return validImages[Math.floor(Math.random() * validImages.length)]
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const BASE_URL = process.env.NODE_ENV === 'production' ? '/happy-birthday-jaii' : ''

const getOptimizedImageUrl = (originalUrl) => {
  const filename = originalUrl.split('/').pop()
  const basename = filename.split('.')[0]
  return {
    mobile: `${BASE_URL}/images/optimized/${basename}_mobile.webp`,
    tablet: `${BASE_URL}/images/optimized/${basename}_tablet.webp`,
    desktop: `${BASE_URL}/images/optimized/${basename}_desktop.webp`
  }
}

const createImageObject = (imageUrl, index) => {
  const optimizedUrls = getOptimizedImageUrl(imageUrl)
  return {
    imageUrl: optimizedUrls.mobile,
    srcset: `${optimizedUrls.mobile} 100w, ${optimizedUrls.tablet} 110w, ${optimizedUrls.desktop} 120w`,
    sizes: "(max-width: 640px) 100px, (max-width: 1024px) 110px, 120px",
    title: `Memory ${index + 1}`,
    description: 'Our special moments together',
    isFlipping: false,
    newImageUrl: null,
    newSrcset: null
  }
}

const loadImageBatch = async (images, startIndex) => {
  const batch = images.slice(startIndex, startIndex + 12)
  if (batch.length === 0) {
    isLoading.value = false
    return
  }

  const batchImages = batch.map((imageUrl, index) => createImageObject(imageUrl, startIndex + index))
  backgroundImages.value.push(...batchImages)

  if (startIndex + 12 < images.length) {
    setTimeout(() => {
      loadImageBatch(images, startIndex + 12)
    }, 200)
  } else {
    isLoading.value = false
  }
}

// Track multiple intervals
let tileChangeIntervals = []

const randomlyChangeTile = () => {
  if (backgroundImages.value.length === 0 || allImages.value.length === 0) return
  
  // Pick a random tile to change
  const randomIndex = Math.floor(Math.random() * backgroundImages.value.length)
  
  // Get a valid random image that's not adjacent to existing ones
  const randomImageUrl = getValidRandomImage(randomIndex)
  if (!randomImageUrl) return
  
  // Get the current image object
  const currentImage = {...backgroundImages.value[randomIndex]}
  
  // Create new image object
  const newImage = createImageObject(randomImageUrl, randomIndex)
  
  // Start flip animation
  currentImage.isFlipping = true
  currentImage.newImageUrl = newImage.imageUrl
  currentImage.newSrcset = newImage.srcset
  
  // Update the current image with flip animation state
  backgroundImages.value[randomIndex] = currentImage
  
  // After animation completes, update to new image
  setTimeout(() => {
    backgroundImages.value[randomIndex] = {
      ...newImage,
      isFlipping: false
    }
  }, 600) // Match the CSS transition duration
}

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

// Keyboard controls
const handleKeyPress = (event) => {
  // Ignore if user is typing in an input field
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    return;
  }

  switch (event.code) {
    case 'Space':
      event.preventDefault(); // Prevent page scroll
      togglePlay();
      break;
    case 'ArrowRight':
      skipForward();
      break;
    case 'ArrowLeft':
      skipBackward();
      break;
    case 'KeyM':
      toggleMute();
      break;
    case 'KeyR':
      toggleRepeat();
      break;
  }
};

// Audio event listeners
const updateTime = () => {
  if (!audioElement.value) return;

  if (audioElement.value.currentTime >= MAX_DURATION) {
    audioElement.value.currentTime = MAX_DURATION;
    audioElement.value.pause();
    isPlaying.value = false;
    if (isRepeat.value) {
      audioElement.value.currentTime = 0;
      audioElement.value.play();
      isPlaying.value = true;
    }
    return;
  }
  currentTime.value = Math.min(audioElement.value.currentTime, MAX_DURATION);
};

const updateDuration = () => {
  if (!audioElement.value) return;
  maxDuration.value = Math.min(audioElement.value.duration, MAX_DURATION);
};

const handleEnded = () => {
  if (!audioElement.value) return;

  if (isRepeat.value) {
    audioElement.value.currentTime = 0;
    audioElement.value.play();
  } else {
    isPlaying.value = false;
  }
};

// Player controls
const togglePlay = () => {
  if (!audioElement.value) return;

  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const skipForward = () => {
  if (!audioElement.value) return;
  audioElement.value.currentTime = Math.min(audioElement.value.currentTime + 10, MAX_DURATION);
};

const skipBackward = () => {
  if (!audioElement.value) return;
  audioElement.value.currentTime = Math.max(audioElement.value.currentTime - 10, 0);
};

const toggleRepeat = () => {
  isRepeat.value = !isRepeat.value;
};

const toggleMute = () => {
  if (!audioElement.value) return;
  audioElement.value.muted = !audioElement.value.muted;
  isMuted.value = audioElement.value.muted;
};

const handleSeek = (time) => {
  if (!audioElement.value) return;
  audioElement.value.currentTime = Math.min(time, MAX_DURATION);
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyPress);
  if (audioElement.value) {
    audioElement.value.addEventListener('timeupdate', updateTime);
    audioElement.value.addEventListener('loadedmetadata', updateDuration);
    audioElement.value.addEventListener('ended', handleEnded);
  }

  // Load background images
  const imageModules = import.meta.glob('/public/images/*')
  const imageUrls = Object.keys(imageModules).map(path => path.replace('/public', ''))
  allImages.value = [...imageUrls]  // Store all images for later use
  const shuffledImages = shuffleArray([...imageUrls])
  loadImageBatch(shuffledImages, 0)

  // Start multiple tile changing intervals with different timings
  tileChangeIntervals = [
    setInterval(randomlyChangeTile, 1500),  // Fast changes
    setInterval(randomlyChangeTile, 700),  // Very fast changes
    setInterval(randomlyChangeTile, 3000), // Slow changes
  ]
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyPress);
  if (audioElement.value) {
    audioElement.value.removeEventListener('timeupdate', updateTime);
    audioElement.value.removeEventListener('loadedmetadata', updateDuration);
    audioElement.value.removeEventListener('ended', handleEnded);
    audioElement.value.pause();
  }

  // Clear all intervals when component is unmounted
  tileChangeIntervals.forEach(interval => clearInterval(interval))
});
</script>

<style>
.prose {
  max-width: 65ch;
  margin: 0 auto;
}
</style>
