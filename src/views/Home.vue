<template>
  <div class="home-container">
    <!-- Background Grid -->
    <div class="background-grid" :class="{ 'is-loading': isLoading }">
      <PinterestGrid
        :items="backgroundImages"
        @item-click="() => {}"
      />
    </div>

    <!-- Main Content Overlay -->
    <div class="content-overlay">
      <div class="max-w-2xl w-full text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Happy Birthday Jaii!
        </h1>

        <p class="text-lg md:text-xl text-gray-100 mb-12">
          Welcome to your special birthday website! ✨
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <router-link
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group border border-purple-100"
          >
            <h2 class="text-xl font-medium mb-2 text-purple-600 group-hover:text-purple-700">
              {{ link.title }}
            </h2>
            <p class="text-sm text-gray-500 group-hover:text-gray-600">
              {{ link.description }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PinterestGrid from '../components/PinterestGrid.vue'

const BATCH_SIZE = 12
const BATCH_DELAY = 200

const links = [
  {
    title: "Just For You",
    description: "A special song and message from me",
    path: "/just-for-you"
  },
  {
    title: "Birthday Wishes",
    description: "Messages from your loved ones",
    path: "/birthday-wishes"
  },
  {
    title: "Our Story",
    description: "A journey through our memories together",
    path: "/our-story"
  }
]

const backgroundImages = ref([])
const isLoading = ref(true)

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getOptimizedImageUrl = (originalUrl) => {
  const filename = originalUrl.split('/').pop()
  const basename = filename.split('.')[0]
  return {
    mobile: `/images/optimized/${basename}_mobile.webp`,
    tablet: `/images/optimized/${basename}_tablet.webp`,
    desktop: `/images/optimized/${basename}_desktop.webp`
  }
}

const loadImageBatch = async (images, startIndex) => {
  const batch = images.slice(startIndex, startIndex + BATCH_SIZE)
  if (batch.length === 0) {
    isLoading.value = false
    return
  }

  const batchImages = batch.map((imageUrl, index) => {
    const optimizedUrls = getOptimizedImageUrl(imageUrl)
    return {
      imageUrl: optimizedUrls.mobile,
      srcset: `${optimizedUrls.mobile} 100w, ${optimizedUrls.tablet} 110w, ${optimizedUrls.desktop} 120w`,
      sizes: "(max-width: 640px) 100px, (max-width: 1024px) 110px, 120px",
      title: `Memory ${startIndex + index + 1}`,
      description: 'Our special moments together'
    }
  })

  backgroundImages.value.push(...batchImages)

  // Load next batch after delay
  if (startIndex + BATCH_SIZE < images.length) {
    setTimeout(() => {
      loadImageBatch(images, startIndex + BATCH_SIZE)
    }, BATCH_DELAY)
  } else {
    isLoading.value = false
  }
}

onMounted(async () => {
  // Use Vite's glob import to get all images
  const imageModules = import.meta.glob('/public/images/*')
  const imageUrls = Object.keys(imageModules).map(path => path.replace('/public', ''))

  // Shuffle the images before loading
  const shuffledImages = shuffleArray([...imageUrls])

  // Start loading images in batches
  loadImageBatch(shuffledImages, 0)
})
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #f8f8f8;
}

.background-grid {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: #f8f8f8;
}

.background-grid.is-loading::after {
  backdrop-filter: blur(8px);
}

.background-grid::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(248, 248, 248, 0.5);
  backdrop-filter: blur(0);
  transition: backdrop-filter 0.5s ease;
  z-index: 1;
}

.content-overlay {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>
