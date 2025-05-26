<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8 overflow-y-scroll">
    <div class="max-w-7xl mx-auto">
      <!-- Main Grid -->
      <div class="columns-1 md:columns-3 lg:columns-4 gap-6">
        <!-- Header Tile -->
        <div class="wish-card group bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-purple-400/20 break-inside-avoid-column mb-6 relative overflow-hidden pt-12 pb-24">
          <div class="confetti-header absolute inset-0"></div>
          <!-- Card Content -->
          <div class="space-y-6 relative z-10">
            <h1 class="text-5xl font-bold mb-2 text-white">
              Happy Birthday!
            </h1>
            <p class="text-xl mb-2 text-white">
              Looks like I'm not the only one who has something to say
            </p>
          </div>
        </div>

        <!-- Wish Cards -->
        <div
          v-for="(wish, index) in wishesData"
          :key="wish.id"
          class="wish-card group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 break-inside-avoid-column mb-6 relative overflow-hidden py-6 px-6"
          :class="[
            `confetti-pattern-${index % 6}`,
            {'has-long-message': wish.message.length > 200}
          ]"
        >
          <div class="confetti-overlay absolute inset-0"></div>
          <!-- Card Content -->
          <div class="space-y-6 relative z-10">
            <p class="text-lg leading-relaxed text-gray-700">
              {{ wish.message }}
            </p>
            <div class="flex items-center justify-end pt-4 border-t border-purple-100">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
                  {{ wish.from.charAt(0) }}
                </div>
                <span class="ml-3 text-purple-700 font-medium">
                  {{ wish.from }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="col-span-full text-center mt-12">
          <router-link to="/" class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center group">
            <span class="transform group-hover:-translate-x-1 transition-transform duration-150">←</span>
            <span class="ml-2">Back to Home</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import wishes from '@/data/wishes.json'

const wishesData = wishes.wishes
</script>

<style scoped>
.wish-card {
  transform: translateZ(0);
  display: inline-block;
  width: 100%;
}

.wish-card:hover {
  transform: translateY(-2px);
}

/* Base confetti shapes */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(2deg); }
}

.confetti-header {
  background-color: rgba(255, 255, 255, 0.1);
  background-image:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 8px, transparent 8px),
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2) 6px, transparent 6px),
    radial-gradient(circle at 80% 60%, rgba(255, 255, 255, 0.2) 10px, transparent 10px),
    linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.2) 48%, rgba(255, 255, 255, 0.2) 52%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.2) 48%, rgba(255, 255, 255, 0.2) 52%, transparent 52%);
  background-size: 100px 100px;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.confetti-pattern-0 .confetti-overlay {
  background-image:
    radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.2) 6px, transparent 6px),
    radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.2) 4px, transparent 4px);
  background-size: 60px 60px;
  opacity: 0.15;
}

.confetti-pattern-1 .confetti-overlay {
  background-image:
    linear-gradient(45deg, transparent 48%, rgba(34, 197, 94, 0.2) 48%, rgba(34, 197, 94, 0.2) 52%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(14, 165, 233, 0.2) 48%, rgba(14, 165, 233, 0.2) 52%, transparent 52%);
  background-size: 40px 40px;
  opacity: 0.15;
}

.confetti-pattern-2 .confetti-overlay {
  background-image:
    radial-gradient(circle at 30% 40%, rgba(236, 72, 153, 0.2) 5px, transparent 5px),
    radial-gradient(circle at 70% 60%, rgba(34, 197, 94, 0.2) 8px, transparent 8px),
    radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.2) 6px, transparent 6px);
  background-size: 70px 70px;
  opacity: 0.15;
}

.confetti-pattern-3 .confetti-overlay {
  background-image:
    linear-gradient(90deg, rgba(236, 72, 153, 0.2) 2px, transparent 2px),
    linear-gradient(0deg, rgba(34, 197, 94, 0.2) 2px, transparent 2px),
    radial-gradient(circle at 60% 60%, rgba(14, 165, 233, 0.2) 8px, transparent 8px);
  background-size: 50px 50px;
  opacity: 0.15;
}

.confetti-pattern-4 .confetti-overlay {
  background-image:
    radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.2) 8px, transparent 8px),
    radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 6px, transparent 6px),
    radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2) 10px, transparent 10px);
  background-size: 80px 80px;
  opacity: 0.15;
}

.confetti-pattern-5 .confetti-overlay {
  background-image:
    linear-gradient(45deg, transparent 45%, rgba(14, 165, 233, 0.2) 45%, rgba(14, 165, 233, 0.2) 55%, transparent 55%),
    linear-gradient(-45deg, transparent 45%, rgba(236, 72, 153, 0.2) 45%, rgba(236, 72, 153, 0.2) 55%, transparent 55%),
    radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2) 6px, transparent 6px);
  background-size: 60px 60px;
  opacity: 0.15;
}

/* Add wavy lines using pseudo-elements */
.confetti-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(14, 165, 233, 0.1) 5px, rgba(14, 165, 233, 0.1) 10px),
    repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(236, 72, 153, 0.1) 5px, rgba(236, 72, 153, 0.1) 10px);
  background-size: 30px 30px;
  animation: float 8s ease-in-out infinite;
}

.has-long-message .confetti-overlay {
  opacity: 0.1;
}
</style>
