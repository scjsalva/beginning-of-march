<!-- Player.vue -->
<template>
  <div class="min-h-screen flex flex-col relative cursor-pointer">
    <!-- Background Grid -->
    <div class="fixed inset-0">
      <PinterestGrid
        :items="backgroundImages"
        @item-click="handleImageClick"
        :pointer-events="!showGridOverlay"
      />
      <div
        class="absolute inset-0 transition-all duration-300"
        :class="showGridOverlay ? 'bg-black/30 backdrop-blur-[2px] pointer-events-auto' : 'pointer-events-none'"
      ></div>
    </div>

    <!-- Grid Toggle Button -->
    <div class="fixed top-6 right-6 z-30">
      <button
        @click="showGridOverlay = !showGridOverlay"
        class="bg-white backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
      >
        <svg
          v-if="showGridOverlay"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>

    <!-- Album Info Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showGridOverlay"
        class="flex-1 flex items-center justify-center z-20 -mt-32"
      >
        <div class="text-center">
          <img
            :src="getAssetUrl('album-cover.jpg')"
            alt="Album Cover"
            class="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-lg shadow-2xl mb-8 mx-auto"
          />
          <div class="w-48 md:w-64 lg:w-80 mx-auto">
            <h3 class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white drop-shadow-lg truncate">Beginning of March</h3>
            <p class="lg:text-lg text-white/90">scarlooo</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Player Controls -->
    <div class="player-container fixed bottom-0 left-0 right-0">
      <!-- Drawer -->
      <div
        class="absolute left-0 right-0 transition-all duration-300 ease-in-out z-40"
        :class="[
          isDrawerOpen ? '-top-[40vh]' : 'top-0'
        ]"
      >
        <!-- Pull Tab -->
        <div class="absolute -top-[42px] left-1/2 -translate-x-1/2">
          <button
            class="bg-white backdrop-blur-sm px-8 py-4 rounded-t-full border-t border-l border-r border-gray-200"
            @click="isDrawerOpen = !isDrawerOpen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 pb-2 text-gray-400 transition-transform duration-300"
              :class="{ 'rotate-180': isDrawerOpen }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="bg-white backdrop-blur-sm shadow-lg h-[40vh]">
          <div class="max-w-screen-lg mx-auto px-4 md:px-8 py-8 h-full flex flex-col items-center justify-center gap-6">
            <button
              @click="showMessage = true"
              class="w-full max-w-md py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              From Me to You
            </button>
            <button
              @click="$router.push('/birthday-wishes')"
              class="w-full max-w-md py-4 px-6 rounded-xl bg-white text-gray-700 font-medium shadow border border-gray-200 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Warm Wishes from Friends
            </button>
          </div>
        </div>
      </div>

      <!-- Controls Content -->
      <div class="bg-white backdrop-blur-sm shadow-lg z-50 relative">
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
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showMessage"
        class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
        @click="showMessage = false"
      >
        <div
          class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 transform"
          @click.stop
        >
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Happiest Birthday Jaii!
            </h2>
            <button
              @click="showMessage = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="prose prose-zinc max-w-none text-justify">
            <p class="text-gray-600 leading-relaxed mt-4">
              I hope today brings you all the love and joy you give to everyone around you. You care deeply—for your family, your friends, and the things you’re passionate about—and it shows in everything you do. You carry this quiet grace, and you’re the kind of person who makes others want to slow down and appreciate the good around them. You’re smart, kind, endlessly amazing in ways that are both loud and quietly felt—and I feel so lucky to know you the way I do.
            </p>
            <p class="text-gray-600 leading-relaxed mt-4">
              Getting to know you these last four months has been one of the most grounding and beautiful experiences of my life. You make the ordinary feel special, even on the toughest days—especially on the toughest days—you somehow make things feel lighter. You are my 0. You’re not just someone in my life—you’ve been a steady, calm presence from the moment you came. In a world full of noise and chaos, you’ve become an anchor—and for that, I’m really thankful.
            </p>
            <p class="text-gray-600 leading-relaxed mt-4">
              I have my flaws and I have a long way to go. Thank you for being patient with me, for seeing past those imperfections, and giving me the chance to grow. I care about you deeply and want to keep showing up, day by day, building something meaningful with you. I’ll be here—I got your back, holding space for your fears, and cheering you on as you chase your dreams. I hope we keep growing together, one problem at a time. I’m in this with you, for as long as you’ll have me.
            </p>
            <p class="text-gray-600 leading-relaxed mt-4">
              Today is your day—not just because it’s your birthday, but because you deserve to be celebrated for the amazing person you are. Here’s to another year of memories, laughter, mundane everyday moments, and everything in between. I’m so glad I get to be by your side through it all.
            </p>
            <p class="text-gray-600 leading-relaxed mt-4">
              Right here, always,<br>
              Carlo
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Image Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-white/80 flex items-center justify-center z-[9999] p-8"
        @click="selectedImage = null"
      >
        <div
          class="w-[min(600px,calc(100vw-4rem))] h-[min(600px,calc(100vw-4rem))] bg-white relative"
        >
          <div
            v-if="isModalImageLoading"
            class="absolute inset-0 flex items-center justify-center bg-gray-50"
          >
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-purple-500"></div>
          </div>
          <img
            :src="selectedImage"
            class="w-full h-full object-cover cursor-pointer"
            alt="Selected memory"
            @load="isModalImageLoading = false"
            @error="isModalImageLoading = false"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Controls from '../components/Controls.vue';
import Progress from '../components/Progress.vue';
import PinterestGrid from '../components/PinterestGrid.vue';

// Constants
const MAX_DURATION = 177; // 2:57 in seconds

// UI State
const isDrawerOpen = ref(false);
const showMessage = ref(false);
const showGridOverlay = ref(true);

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

// Add selectedImage ref
const selectedImage = ref(null)

// Add this after your imports
const IMAGE_EXTENSIONS = {
  '5082': 'jpg',
  '5057': 'jpg'
}

// Add loading state
const isModalImageLoading = ref(false)

// Update handleImageClick function
const handleImageClick = (image) => {
  if (!showGridOverlay.value && !image.isFlipping) {
    // Set loading state to true before loading new image
    isModalImageLoading.value = true
    // Extract the image number from the optimized filename
    const imageNumber = image.imageUrl.match(/IMG_(\d+)/)[1]
    // Get the correct extension for this image number
    const extension = IMAGE_EXTENSIONS[imageNumber] || 'PNG'
    // Construct the original image path
    selectedImage.value = `${BASE_URL}/images/IMG_${imageNumber}.${extension}`
  }
}

// Reset loading state when modal is closed
watch(selectedImage, (newValue) => {
  if (!newValue) {
    isModalImageLoading.value = false
  }
})

// Lifecycle hooks
onMounted(() => {
  if (audioElement.value) {
    audioElement.value.addEventListener('timeupdate', updateTime);
    audioElement.value.addEventListener('loadedmetadata', updateDuration);
    audioElement.value.addEventListener('ended', handleEnded);
  }

  // Load background images
  const imageModules = import.meta.glob('/public/images/*')
  const imageUrls = Object.keys(imageModules).map(path => {
    // Remove /public prefix but keep /images path
    const relativePath = path.replace('/public', '')
    // For production, prepend the base URL
    return process.env.NODE_ENV === 'production' ? `/happy-birthday-jaii${relativePath}` : relativePath
  })
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
