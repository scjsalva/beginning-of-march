<template>
  <div class="pinterest-grid">
    <div 
      class="grid-container"
      :style="{ pointerEvents: pointerEvents ? 'auto' : 'none' }"
    >
      <div
        v-for="(item, index) in items"
        :key="`${item.imageUrl}-${index}`"
        class="grid-item"
        :class="{ 'no-click': item.isFlipping }"
        @click="!item.isFlipping && $emit('item-click', item)"
      >
        <div 
          class="flip-container"
          :class="{ 'is-flipping': item.isFlipping }"
        >
          <div class="flipper">
            <div class="front">
              <div class="image-container" :class="{ 'is-loading': !loadedImages[index] }">
                <div class="square-wrapper">
                  <div v-if="!loadedImages[index]" class="loading-placeholder" />
                  <img
                    :src="item.imageUrl"
                    :srcset="item.srcset"
                    :sizes="item.sizes"
                    :alt="item.title"
                    class="grid-image"
                    :class="{ 'is-loaded': loadedImages[index] }"
                    loading="lazy"
                    @load="onImageLoad(index)"
                    ref="images"
                  />
                </div>
                <div class="image-overlay" v-show="loadedImages[index]">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <p class="item-description">{{ item.description }}</p>
                </div>
              </div>
            </div>
            <div class="back">
              <div class="image-container" :class="{ 'is-loading': !loadedImages[index] }">
                <div class="square-wrapper">
                  <div v-if="!loadedImages[index]" class="loading-placeholder" />
                  <img
                    :src="item.newImageUrl || item.imageUrl"
                    :srcset="item.newSrcset || item.srcset"
                    :sizes="item.sizes"
                    :alt="item.title"
                    class="grid-image"
                    :class="{ 'is-loaded': loadedImages[index] }"
                    loading="lazy"
                    @load="onImageLoad(index)"
                    ref="images"
                  />
                </div>
                <div class="image-overlay" v-show="loadedImages[index]">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <p class="item-description">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  pointerEvents: {
    type: Boolean,
    default: true
  }
})

defineEmits(['item-click'])

const images = ref([])
const loadedImages = ref({})

const onImageLoad = (index) => {
  const img = images.value[index]
  if (img) {
    img.style.objectFit = 'cover'
    img.style.objectPosition = 'center'
    loadedImages.value[index] = true
  }
}
</script>

<style scoped>
.pinterest-grid {
  width: 100%;
  padding: 10px;
  transform: translateY(-100px);
  background: #f8f8f8;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background: #f8f8f8;
}

@media (min-width: 640px) {
  .grid-container {
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(10, 1fr);
    gap: 12px;
  }
}

@media (min-width: 1536px) {
  .grid-container {
    grid-template-columns: repeat(12, 1fr);
  }
}

.grid-item {
  break-inside: avoid;
  cursor: pointer;
  transition: transform 0.3s ease;
  background: #f8f8f8;
  position: relative;
  padding-bottom: 100%;
  perspective: 1000px;
}

.grid-item:hover {
  transform: none;
}

.flip-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-container.is-flipping {
  transform: rotateY(180deg);
}

.flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
}

.back {
  transform: rotateY(180deg);
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background-color: #f0f0f0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container.is-loading {
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.square-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.grid-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.grid-image.is-loaded {
  opacity: 1;
}

.grid-item:hover .image-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-overlay {
  display: none;
}

.grid-item:hover .image-overlay {
  opacity: 0;
}

.item-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 2px 0;
}

.item-description {
  font-size: 0.75rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

.grid-item.no-click {
  pointer-events: none;
  cursor: default;
}
</style>
