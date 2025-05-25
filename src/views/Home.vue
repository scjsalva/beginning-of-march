<template>
  <div class="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
    <div class="max-w-2xl w-full text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
        Happy Birthday Jaii! 🎂
      </h1>
      
      <p class="text-lg md:text-xl text-zinc-300 mb-12">
        Welcome to your special birthday website! ✨
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        <router-link 
          v-for="link in links" 
          :key="link.path"
          :to="link.path"
          class="p-6 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-all duration-300 group"
        >
          <h2 class="text-xl font-medium mb-2 text-purple-400 group-hover:text-purple-300">
            {{ link.title }}
          </h2>
          <p class="text-sm text-zinc-400 group-hover:text-zinc-300">
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
    title: "Beginning of March",
    description: "Listen to a special song just for you",
    path: "/beginning-of-march"
  },
  {
    title: "Birthday Wishes",
    description: "Messages from your loved ones",
    path: "/birthday-wishes"
  },
  {
    title: "Just For You",
    description: "A personal message from me",
    path: "/my-message"
  },
  {
    title: "Our Story",
    description: "A journey through our memories together",
    path: "/our-story"
  }
]
</script> 
