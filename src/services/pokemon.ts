import { Ref, computed, ref } from 'vue'
import { useQuery, useQueries } from '@tanstack/vue-query'
import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
  PokemonListResponseItem,
} from '../types/pokemon'

export const PAGE_SIZE = 20

export enum PokemonStateName {
  hp = 'hp',
  attack = 'attack',
  defense = 'defense',
  specialAttack = 'special-attack',
  specialDefense = 'special-defense',
  speed = 'speed',
}

export const usePokemonListQuery = (pageRef: Ref<number>) => {
  const page = computed(() =>
    !pageRef.value || pageRef.value < 1 ? 1 : pageRef.value,
  )

  return useQuery({
    queryKey: ['pokemonList', page],
    queryFn: async (): Promise<PokemonListResponse> => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page.value - 1) * 20}`,
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    staleTime: Infinity,
  })
}

export const usePokemonQuery = (name: string) =>
  useQuery({
    queryKey: ['pokemon', name],
    queryFn: async (): Promise<Pokemon> => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    staleTime: Infinity,
  })

export const usePokemonSpeciesQuery = (name: string) =>
  useQuery({
    queryKey: ['pokemon-species', name],
    queryFn: async (): Promise<PokemonSpecies> => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`,
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    staleTime: Infinity,
  })

export const getPokemonQuery = (name: string) => ({
  queryKey: ['pokemon', name],
  queryFn: async (): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const jsonData = await response.json()
    return jsonData
  },
  staleTime: Infinity,
})

export const usePokemonListDataQuery = (
  pokemonList: Ref<PokemonListResponse | undefined> = ref({
    count: 0,
    results: [],
  }),
) => {
  const pokemonQueriesOptions = computed(() =>
    pokemonList?.value
      ? pokemonList?.value.results.map((pokemon: PokemonListResponseItem) => {
          return getPokemonQuery(pokemon.name)
        })
      : [],
  )

  const pokemonListData = useQueries({
    queries: pokemonQueriesOptions,
  })

  const pokemonListDataProcessed = computed(() => {
    const hasFetching = pokemonListData.value.some(
      (pokemon) => pokemon.isFetching,
    )

    const hasError = pokemonListData.value.some((pokemon) => pokemon.isError)
    return {
      isFetching: hasFetching,
      isError: hasError,
      data: pokemonListData.value
        .map((pokemon) => pokemon.data as Pokemon)
        .filter((pokemon) => pokemon),
    }
  })

  return pokemonListDataProcessed
}
