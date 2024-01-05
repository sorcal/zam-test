import { describe, it, expect } from 'vitest'
import {
  getDescriptionTextFromPokemonSpecies,
  getMovesStringFromPokemon,
} from '../../utils/pokemon'
import { generatePokemonData } from '../components/pokemons/testData'

describe('pokemon utils', () => {
  it('getDescriptionTextFromPokemonSpecies return empty string for undefined', async () => {
    expect(getDescriptionTextFromPokemonSpecies(undefined)).toBe('')
  })

  it('getDescriptionTextFromPokemonSpecies return valid en data', async () => {
    const pokemonSpecies = {
      flavor_text_entries: [
        { flavor_text: 'Test text', language: { name: 'en' } },
        { flavor_text: 'Another test text', language: { name: 'en' } },
        { flavor_text: 'Texto de prueba', language: { name: 'es' } },
      ],
    }
    expect(getDescriptionTextFromPokemonSpecies(pokemonSpecies)).toBe(
      'Test text Another test text',
    )
  })

  it('getDescriptionTextFromPokemonSpecies removes unnecessary symbols', async () => {
    const pokemonSpecies = {
      flavor_text_entries: [
        {
          flavor_text: 'Test\f\u00ad\n\u00ad-\n -\n\ntext',
          language: { name: 'en' },
        },
      ],
    }

    expect(getDescriptionTextFromPokemonSpecies(pokemonSpecies)).toBe(
      'Test - -  text',
    )
  })

  it('getMovesStringFromPokemon return empty string for empty moves', () => {
    const pokemon = {
      ...generatePokemonData(1),
      moves: [],
    }
    expect(getMovesStringFromPokemon(pokemon)).toBe('')
  })
  it('getMovesStringFromPokemon return one moves', () => {
    const pokemon = {
      ...generatePokemonData(1),
      moves: [{ move: { name: 'tackle' } }],
    }
    expect(getMovesStringFromPokemon(pokemon)).toBe('Tackle')
  })

  it('getMovesStringFromPokemon return multiple move', () => {
    const pokemon = {
      ...generatePokemonData(1),
      moves: [{ move: { name: 'tackle' } }, { move: { name: 'growl' } }],
    }
    expect(getMovesStringFromPokemon(pokemon)).toBe('Tackle, Growl')
  })
})
