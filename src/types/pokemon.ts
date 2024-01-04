import { PokemonStateName } from '../services/pokemon'

export type PokemonListResponseItem = {
  name: string
  url: string
}

export type PokemonListResponse = {
  count: number
  results: PokemonListResponseItem[]
}

export type PokemonStat = {
  base_stat: number
  stat: {
    name: PokemonStateName
  }
}

export type PokemonAbility = {
  ability: {
    name: string
  }
}

export type PokemonMove = {
  move: {
    name: string
  }
}

export type PokemonType = {
  type: {
    name: string
  }
}

export type Pokemon = {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  types: PokemonType[]
  moves: PokemonMove[]
}

export type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[]
}
