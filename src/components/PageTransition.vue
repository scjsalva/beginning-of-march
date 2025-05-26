<template>
  <div class="page-transition">
    <slot></slot>
  </div>
</template>

<style scoped>
.page-transition {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 
