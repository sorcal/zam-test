<template>
  <header class="bg-white shadow-lg">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between px-4 h-16"
      aria-label="Global"
    >
      <RouterLink class="text-xl font-semibold text-sky-600 p-2" to="/">
        <img src="/images/nasa-3.svg" alt="NASA Logo" class="h-16 w-auto" />
      </RouterLink>
      <div class="flex space-x-6 items-center justify-center">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-base leading-6 text-gray-900 hover:text-sky-600 p-2"
          >{{ item.name }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
]
</script>
