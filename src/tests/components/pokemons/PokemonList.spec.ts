import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PokemonList from '../../../components/pokemons/PokemonList.vue'
import PokemonListItemLoaderVue from '../../../components/pokemons/PokemonListItemLoader.vue'
import PokemonListItemVue from '../../../components/pokemons/PokemonListItem.vue'
import { generatePokemonData } from './testData'

describe('PokemonList.vue', () => {
  it('show loading state', () => {
    const wrapper = mount(PokemonList, {
      props: {
        isDataFetching: true,
        pokemons: [],
      },
    })

    expect(wrapper.findAllComponents(PokemonListItemLoaderVue).length).toBe(20)
  })

  it('show pokemon list', () => {
    const wrapper = mount(PokemonList, {
      props: {
        isDataFetching: false,
        pokemons: [generatePokemonData(1), generatePokemonData(2)],
      },
    })

    expect(wrapper.findAllComponents(PokemonListItemVue).length).toBe(2)
  })
})
