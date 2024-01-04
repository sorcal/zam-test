<template>
  <div class="max-w-3xl mx-auto pb-20 w-full">
    <h1 class="mt-8 mb-12 text-3xl">Pokemon List</h1>

    <PokemonList
      :pokemons="pokemonListResponse?.results || []"
      :is-data-fetching="isPokemonListFetching"
    />

    <section
      class="mt-4 border-t border-gray-200 pt-4 flex items-center justify-center"
    >
      <ListPagination
        v-if="pageCount > 1"
        :current-page="currentPage"
        :page-count="pageCount"
        :get-url-for-page="getUrlForPage"
        :disabled="false"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonListQuery, PAGE_SIZE } from '../services/pokemon'
import PokemonList from '../components/pokemons/PokemonList.vue'
import ListPagination from '../components/common/ListPagination.vue'

function getUrlForPage(page: number) {
  return `/pokemons?page=${page}`
}

const route = useRoute()
const router = useRouter()
const currentPage = computed(() =>
  route.query.page ? Number(route.query.page) : 1,
)

const { data: pokemonListResponse, isFetching: isPokemonListFetching } =
  usePokemonListQuery(currentPage)

const pageCount = ref(0)

function setPageCount() {
  pageCount.value = pokemonListResponse?.value?.count
    ? Math.ceil(pokemonListResponse.value.count / PAGE_SIZE)
    : 0
}

setPageCount()

watch(
  () => isPokemonListFetching.value,
  (isFetching, oldValue) => {
    if (!isFetching && oldValue) {
      setPageCount()
    }
  },
)

watch(
  () => currentPage.value,
  (page) => {
    if (page < 1) {
      router.push({ path: '/pokemons', query: { page: 1 } })
      return
    }
    if (pageCount.value > 1 && page > pageCount.value) {
      router.push({ path: '/pokemons', query: { page: pageCount.value } })
    }
  },
  {
    immediate: true,
  },
)
</script>
