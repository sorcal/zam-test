<template>
  <!-- <PokemonListItemLoader v-if="isFetching" /> -->
  <tr>
    <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
      <div class="flex items-center">
        <div class="h-10 w-10 flex-shrink-0">
          <img
            class="h-10 w-10 rounded-full"
            :src="pokemon.sprites?.front_default"
            :alt="`${pokemon.name} image`"
          />
        </div>
        <div class="ml-4 text-left">
          <div class="font-medium text-gray-900 capitalize">
            {{ pokemon.name }}
          </div>
          <!-- <div v-if="pokemon" class="text-gray-500 text-xs">
            Height: {{ pokemon.height }} / Weight: {{ pokemon.weight }}
          </div> -->
        </div>
      </div>
    </td>
    <td
      class="whitespace-nowrap px-3 py-2 text-gray-900 text-xs text-center hidden xs:table-cell"
    >
      <span v-if="typesString" v-text="typesString" />
    </td>
    <td
      class="whitespace-nowrap px-3 py-2 text-gray-900 text-xs text-center hidden sm:table-cell"
    >
      <span v-if="abilitiesString" v-text="abilitiesString" />
    </td>
    <td
      class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
    >
      <RouterLink
        :to="`/pokemons/${pokemon.name}`"
        class="rounded-md px-2.5 py-1.5 text-xs font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 hover:text-gray-700 w-full"
        data-test-id="view-project-link"
        >View Details<span class="sr-only"
          >, {{ pokemon.name }}</span
        ></RouterLink
      >
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Pokemon } from '../../types/pokemon'
import {
  getAbilitiesStringFromPokemon,
  getTypesStringFromPokemon,
} from '../../utils/pokemon'

const props = defineProps<{
  pokemon: Pokemon
}>()

const abilitiesString = computed(() =>
  getAbilitiesStringFromPokemon(props.pokemon),
)

const typesString = computed(() => getTypesStringFromPokemon(props.pokemon))
</script>
