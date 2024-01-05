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
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (page.value - 1) * 20
        }?limit=1`,
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    staleTime: Infinity,
  })
}

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

export const usePokemonQuery = (name: string) => useQuery(getPokemonQuery(name))

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

export const usePokemonListDataQuery = (pageRef: Ref<number> = ref(1)) => {
  const {
    data: pokemonListResponse,
    isFetching,
    isError,
    isSuccess,
  } = usePokemonListQuery(pageRef)

  const pokemonQueriesOptions = computed(() =>
    pokemonListResponse?.value
      ? pokemonListResponse?.value.results.map(
          (pokemon: PokemonListResponseItem) => {
            return getPokemonQuery(pokemon.name)
          },
        )
      : [],
  )

  const pokemonListData = useQueries({
    queries: pokemonQueriesOptions,
  })

  return computed(() => {
    const hasFetching = pokemonListData.value.some(
      (pokemon) => pokemon.isFetching,
    )

    const hasError = pokemonListData.value.some((pokemon) => pokemon.isError)
    const hasAllSuccess = pokemonListData.value.every(
      (pokemon) => pokemon.isSuccess,
    )
    return {
      isFetching: isFetching.value || hasFetching,
      isError: isError.value || hasError,
      isSuccess: isSuccess.value && hasAllSuccess,
      count: pokemonListResponse.value?.count,
      data: pokemonListData.value
        .map((pokemon) => pokemon.data as Pokemon)
        .filter((pokemon) => pokemon),
    }
  })
}
