import { Pokemon } from '../../../types/pokemon'
import { PokemonStatName } from '../../../services/pokemon'

export function generatePokemonData(id: number): Pokemon {
  return {
    id,
    name: `bulbasaur - ${id}`,
    types: [
      {
        type: {
          name: 'grass',
        },
      },
      {
        type: {
          name: 'poison',
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: 'overgrow',
        },
      },
      {
        ability: {
          name: 'chlorophyll',
        },
      },
    ],
    stats: [
      {
        base_stat: 45,
        stat: {
          name: PokemonStatName.hp,
        },
      },
      {
        base_stat: 49,
        stat: {
          name: PokemonStatName.attack,
        },
      },
      {
        base_stat: 49,
        stat: {
          name: PokemonStatName.defense,
        },
      },
      {
        base_stat: 65,
        stat: {
          name: PokemonStatName.specialAttack,
        },
      },
      {
        base_stat: 65,
        stat: {
          name: PokemonStatName.specialDefense,
        },
      },
      {
        base_stat: 45,
        stat: {
          name: PokemonStatName.speed,
        },
      },
    ],
    moves: [
      {
        move: {
          name: 'razor-wind',
        },
      },
      {
        move: {
          name: 'swords-dance',
        },
      },
    ],
    sprites: {
      front_default: `/img/${id}_small.png`,
      other: {
        'official-artwork': {
          front_default: `/img/${id}_big.png`,
        },
      },
    },
  }
}
