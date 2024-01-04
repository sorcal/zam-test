<template>
  <p v-text="descriptionText" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonSpeciesQuery } from '../../services/pokemon'
import { getDescriptionTextFromPokemonSpecies } from '../../utils/pokemon'

const props = defineProps<{
  pokemonName: string
}>()

const { data: pokemonSpeciesData } = usePokemonSpeciesQuery(props.pokemonName)

const descriptionText = computed(() => {
  return getDescriptionTextFromPokemonSpecies(pokemonSpeciesData?.value)
})
</script>
