<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 text-gray-800 flex flex-col items-center justify-center p-4">
    <div class="max-w-2xl w-full text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        Happy Birthday Jaii! 🎂
      </h1>

      <p class="text-lg md:text-xl text-gray-600 mb-12">
        Welcome to your special birthday website! ✨
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group border border-purple-100"
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
</template>

<script setup>
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
</script>
