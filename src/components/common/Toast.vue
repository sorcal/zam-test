<template>
  <transition name="slide-right">
    <div
      v-if="isVisible"
      class="fixed top-0 right-0 mt-6 mr-6 bg-white z-50 px-6 py-4 rounded shadow-md"
      :class="colorClasses[type || ToastType.success]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { UseToastReturnType, ToastType } from '../../composables/useToast'

const { isVisible, message, type } = inject<UseToastReturnType>('toast') || {}

const colorClasses = {
  [ToastType.success]: 'bg-green-500 text-white',
  [ToastType.error]: 'bg-red-500 text-white',
  [ToastType.info]: 'bg-blue-500 text-white',
} as Record<ToastType, string>
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
