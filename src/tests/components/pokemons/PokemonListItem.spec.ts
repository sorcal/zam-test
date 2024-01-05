import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import PokemonListItem from '../../../components/pokemons/PokemonListItem.vue'
import { generatePokemonData } from './testData'
import {
  getAbilitiesStringFromPokemon,
  getTypesStringFromPokemon,
} from '../../../utils/pokemon'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [],
})

describe('PokemonListItem.vue', () => {
  it('show pokemon data', () => {
    const pokemon = generatePokemonData(1)
    const wrapper = mount(PokemonListItem, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink,
        },
      },
      props: {
        pokemon,
      },
    })

    expect(wrapper.find('[data-test-id="name"]').text()).toBe(pokemon.name)
    expect(wrapper.find('[data-test-id="image"]').attributes('src')).toBe(
      pokemon.sprites.front_default,
    )
    expect(wrapper.find('[data-test-id="types"]').text()).toBe(
      getTypesStringFromPokemon(pokemon),
    )
    expect(wrapper.find('[data-test-id="abilities"]').text()).toBe(
      getAbilitiesStringFromPokemon(pokemon),
    )
    expect(wrapper.find('[data-test-id="view-pokemon-link"]').text()).toBe(
      `View Details, ${pokemon.name}`,
    )

    const routerLink = wrapper.findComponent(RouterLink)
    expect(routerLink.props('to')).toBe(`/pokemons/${pokemon.name}`)
  })
})
