<template>
  <nav
    class="isolate inline-flex rounded-md shadow-sm -space-x-px"
    aria-label="Pagination"
  >
    <template v-for="(btn, index) in pageButtons">
      <span
        v-if="btn.type === 'separator'"
        :key="`${btn.type}-${index}}`"
        class="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 h-10"
      >
        ...
      </span>
      <component
        v-else
        :is="disabled ? 'span' : RouterLink"
        :key="`${btn.type}-${btn.page}`"
        :to="btn.href || ''"
        data-test-id="page-button"
        :class="[
          'relative inline-flex items-center py-2 text-sm font-semibold h-10',
          {
            'bg-white-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
              currentPage !== btn.page,
            'z-10 bg-sky-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600':
              currentPage === btn.page,
            'rounded-l-md': btn.type === 'prev',
            'rounded-r-md': btn.type === 'next',
            'px-3.5': btn.type === 'page',
            'px-3': btn.type !== 'page',
          },
        ]"
      >
        <span v-if="btn.text" v-text="btn.text" />
        <span v-else>{{ btn.page }}</span>
      </component>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  currentPage: number
  pageCount: number
  disabled: boolean
  getUrlForPage: (page: number) => string
}>()

type Button = {
  type: 'prev' | 'next' | 'page' | 'separator'
  page?: number
  text?: string
  disabled?: boolean
  href?: string
}

const pageButtons = computed(() => {
  const pageButtons = [] as Button[]
  pageButtons.push({
    type: 'prev',
    text: '<',
    href: props.getUrlForPage(
      props.currentPage > 1 ? props.currentPage - 1 : 1
    ),
  })

  const pagesToInclude = [
    1,
    props.currentPage - 2,
    props.currentPage - 1,
    props.currentPage,
    props.currentPage + 1,
    props.currentPage + 2,
    props.pageCount,
  ]
  let prevIncludedPage = 0
  for (let i = 0; i < props.pageCount; i++) {
    const page = i + 1
    if (pagesToInclude.includes(page)) {
      if (page > prevIncludedPage + 1) {
        pageButtons.push({
          type: 'separator',
        })
      }
      pageButtons.push({ page, type: 'page', href: props.getUrlForPage(page) })
      prevIncludedPage = page
    }
  }

  pageButtons.push({
    type: 'next',
    text: '>',
    href: props.getUrlForPage(
      props.currentPage < props.pageCount
        ? props.currentPage + 1
        : props.pageCount
    ),
  })
  return pageButtons
})
</script>
