import { PokemonSpecies, Pokemon } from '../types/pokemon'

export function getDescriptionTextFromPokemonSpecies(
  pokemonSpecies: PokemonSpecies | undefined,
): string {
  if (!pokemonSpecies) {
    return ''
  }
  const res = new Set()
  pokemonSpecies?.flavor_text_entries
    .filter((item) => item.language.name === 'en')
    .forEach((item) => {
      const processedText = item.flavor_text
        .replaceAll('\f', '\n')
        .replaceAll('\u00ad\n', '')
        .replaceAll('\u00ad', '')
        .replaceAll(' -\n', ' - ')
        .replaceAll('-\n', '-')
        .replaceAll('\n', ' ')
      res.add(processedText)
    })

  return [...res.values()].join(' ')
}

export function getMovesStringFromPokemon(
  pokemon: Pokemon | undefined,
): string {
  if (!pokemon) {
    return ''
  }

  return pokemon?.moves
    .map(({ move }) =>
      move.name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(', ')
}

export function getTypesStringFromPokemon(
  pokemon: Pokemon | undefined,
): string {
  if (!pokemon) {
    return ''
  }

  return pokemon.types
    .map(({ type }) => type.name.charAt(0).toUpperCase() + type.name.slice(1))
    .join(', ')
}

export function getAbilitiesStringFromPokemon(
  pokemon: Pokemon | undefined,
): string {
  if (!pokemon) {
    return ''
  }

  return pokemon.abilities
    .map(({ ability }) =>
      ability.name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(', ')
}
