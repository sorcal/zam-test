import { Ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
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
          (page.value - 1) * PAGE_SIZE
        }`,
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

// export const getPokemonQuery = (url: string) => ({
//   queryKey: ['pokemon', url],
//   queryFn: async (): Promise<Pokemon> => {
//     const response = await fetch(url)
//     if (!response.ok) {
//       throw new Error('Network response was not ok')
//     }

//     const jsonData = await response.json()
//     return jsonData
//   },
//   staleTime: Infinity,
//   // enabled: true,
// })

// export const usePokemonListDataQuery = () => {
//   // const queries = pokemonList.map((pokemon: PokemonListItem) => {
//   //   return getPokemonQuery(pokemon.url)
//   // })

//   // return useQueries({ queries })

//   const { data: pokemonList } = usePokemonListQuery()

//   const pokemonQueriesOptions = computed(() =>
//     pokemonList?.value
//       ? pokemonList?.value.results.map((pokemon: PokemonListItem) => {
//           return getPokemonQuery(pokemon.url)
//         })
//       : [],
//   )

//   return useQueries({
//     queries: pokemonQueriesOptions,
//   })
// }
