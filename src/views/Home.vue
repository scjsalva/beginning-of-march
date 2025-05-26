<template>
  <div class="home-container">
    <!-- Main Content -->
    <div class="content-overlay">
      <div class="max-w-2xl w-full text-center bg-white p-12 rounded-lg">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Happy Birthday Jaii!
        </h1>

        <p class="text-lg md:text-xl text-gray-600 mb-12">
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
import { ref } from 'vue'

const links = [
  {
    title: "Just For You",
    description: "A special song and message from me",
    path: "just-for-you"
  },
  {
    title: "Birthday Wishes",
    description: "Messages from your loved ones",
    path: "birthday-wishes"
  },
  {
    title: "Our Story",
    description: "A journey through our memories together",
    path: "our-story"
  }
]
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #fdf2f8 0%, #e9d5ff 100%);
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
