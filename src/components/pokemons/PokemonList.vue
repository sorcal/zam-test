<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Pokemon
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-sm font-semibold text-gray-900 hidden xs:table-cell"
                >
                  Types
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-sm font-semibold text-gray-900 hidden sm:table-cell"
                >
                  Abilities
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <template v-if="isDataFetching">
                <PokemonListItemLoader v-for="index in 20" :key="index" />
              </template>
              <template v-else>
                <PokemonListItem
                  v-for="pokemon in pokemons"
                  :key="pokemon.name"
                  :pokemon-list-item="pokemon"
                  :pokemon-name="pokemon.name"
                />
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonListResponseItem } from '../../types/pokemon'
import PokemonListItem from './PokemonListItem.vue'
import PokemonListItemLoader from './PokemonListItemLoader.vue'

defineProps<{
  pokemons: PokemonListResponseItem[]
  isDataFetching: boolean
}>()
</script>
