<template>
  <div class="min-w-full min-h-screen font-sans antialiased bg-gray-100">
    <router-view />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Toast from './components/common/Toast.vue'
</script>
