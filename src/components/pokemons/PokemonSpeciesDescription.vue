<template>
  <div v-if="isFetching" class="animate-pulse space-y-2">
    <div v-for="i in 5" :key="i" class="bg-gray-300 rounded h-4" />
    <div key="last" class="bg-gray-300 rounded h-4 w-1/2" />
  </div>
  <p v-else v-text="descriptionText" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonSpeciesQuery } from '../../services/pokemon'
import { getDescriptionTextFromPokemonSpecies } from '../../utils/pokemon'

const props = defineProps<{
  pokemonName: string
}>()

const { data: pokemonSpeciesData, isFetching } = usePokemonSpeciesQuery(
  props.pokemonName,
)

const descriptionText = computed(() => {
  return getDescriptionTextFromPokemonSpecies(pokemonSpeciesData?.value)
})
</script>
