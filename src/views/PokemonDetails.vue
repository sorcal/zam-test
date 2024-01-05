<template>
  <div v-if="pokemon">
    <div class="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div class="col-span-2" />
        <h1
          class="mt-4 capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          {{ pokemon.name }}
        </h1>
      </div>

      <div class="lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div class="text-center col-span-2">
          <img
            :src="pokemon.sprites.other['official-artwork'].front_default"
            :alt="`${pokemon.name} image`"
            class="inline-block object-cover object-center"
          />
          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text font-medium text-gray-900 text-xl">Stats</h2>
            <div class="prose prose-sm mt-6 text-gray-500">
              <ul role="list" class="grid grid-cols-2 gap-4">
                <li
                  v-for="{ base_stat, stat } in pokemon?.stats"
                  :key="stat.name"
                  class="capitalize flex items-center gap-x-4 justify-center"
                >
                  <component
                    :is="iconsComponents[stat.name]"
                    class="h-8 w-8 inline-block"
                    :class="iconsColorClass[stat.name]"
                    :title="stat.name"
                  />
                  <span class="font-semibold text-2xl text-gray-900">
                    {{ base_stat }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="mx-auto mt-14 max-w-xl sm:mt-16 lg:mt-0 lg:max-w-none col-span-3"
        >
          <PokemonSpeciesDescription
            class="mt-8"
            :pokemon-name="pokemon.name"
          />

          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text font-medium text-gray-900 text-xl">Types</h2>
            <div
              class="prose prose-sm mt-4 text-gray-500"
              v-text="typesString"
            />
          </div>

          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text font-medium text-gray-900 text-xl">Abilities</h2>
            <div
              class="prose prose-sm mt-4 text-gray-500"
              v-text="abilitiesString"
            />
          </div>

          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text font-medium text-gray-900 text-xl">Moves</h2>
            <div
              class="prose prose-sm mt-4 text-gray-500"
              v-text="movesString"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonQuery, PokemonStatName } from '../services/pokemon'
import HeartIcon from '../icons/HeartIcon.vue'
import SpeedIcon from '../icons/SpeedIcon.vue'
import DefenseIcon from '../icons/DefenseIcon.vue'
import SpecialAttackIcon from '../icons/SpecialAttackIcon.vue'
import SpecialDefenseIcon from '../icons/SpecialDefenseIcon.vue'
import AttackIcon from '../icons/AttackIcon.vue'
import PokemonSpeciesDescription from '../components/pokemons/PokemonSpeciesDescription.vue'
import {
  getMovesStringFromPokemon,
  getTypesStringFromPokemon,
  getAbilitiesStringFromPokemon,
} from '../utils/pokemon'
import { ToastType, UseToastReturnType } from '../composables/useToast'

const route = useRoute()

const { data: pokemon, isError } = usePokemonQuery(route.params.name as string)

const toast = inject<UseToastReturnType>('toast')
watch(
  () => isError.value,
  (newValue) => {
    if (newValue) {
      toast?.showToast('Error loading pokemon details', ToastType.error)
    }
  },
)

const iconsComponents = {
  [PokemonStatName.hp]: HeartIcon,
  [PokemonStatName.attack]: AttackIcon,
  [PokemonStatName.defense]: DefenseIcon,
  [PokemonStatName.specialAttack]: SpecialAttackIcon,
  [PokemonStatName.specialDefense]: SpecialDefenseIcon,
  [PokemonStatName.speed]: SpeedIcon,
}
const iconsColorClass = {
  [PokemonStatName.hp]: 'text-red-500',
  [PokemonStatName.attack]: 'text-orange-500',
  [PokemonStatName.defense]: 'text-green-500',
  [PokemonStatName.specialAttack]: 'text-purple-500',
  [PokemonStatName.specialDefense]: 'text-blue-500',
  [PokemonStatName.speed]: 'text-yellow-500',
}

const typesString = computed(() => getTypesStringFromPokemon(pokemon?.value))

const abilitiesString = computed(() =>
  getAbilitiesStringFromPokemon(pokemon?.value),
)

const movesString = computed(() => getMovesStringFromPokemon(pokemon?.value))
</script>
