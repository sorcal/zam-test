import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ListPagination from '../../../components/common/ListPagination.vue'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [],
})

describe('ListPagination', () => {
  it('renders the correct number of page buttons', () => {
    const pageCount = 5
    const currentPage = 3
    const wrapper = mount(ListPagination, {
      global: {
        plugins: [router],
      },
      props: {
        currentPage,
        pageCount,
        disabled: false,
        getUrlForPage: () => '',
      },
    })

    const pageButtons = wrapper.findAll('[data-test-id="page-button"]')
    expect(pageButtons.length).toBe(pageCount + 2)
  })

  it('displays the correct text on the prev and next buttons', () => {
    const wrapper = mount(ListPagination, {
      global: {
        plugins: [router],
      },
      props: {
        currentPage: 1,
        pageCount: 5,
        disabled: false,
        getUrlForPage: () => '',
      },
    })

    const pageButtons = wrapper.findAll('[data-test-id="page-button"]')
    const prevButton = pageButtons[0]
    const nextButton = pageButtons[pageButtons.length - 1]

    expect(prevButton.text()).toBe('<')
    expect(nextButton.text()).toBe('>')
  })

  it('handles disabled state correctly', () => {
    const wrapper = mount(ListPagination, {
      global: {
        plugins: [router],
      },
      props: {
        currentPage: 1,
        pageCount: 5,
        disabled: true,
        getUrlForPage: () => '',
      },
    })

    const disabledButtons = wrapper.findAll('[data-test-id="page-button"]')
    disabledButtons.forEach((el) => {
      expect(el.element.tagName).toBe('SPAN')
    })
  })

  it('renders correct links as buttons', () => {
    function getUrlForPage(page: number) {
      return `/pokemons?page=${page}`
    }
    const wrapper = mount(ListPagination, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink,
        },
      },
      props: {
        currentPage: 3,
        pageCount: 5,
        disabled: false,
        getUrlForPage,
      },
    })

    const buttons = wrapper.findAllComponents(RouterLink)
    expect(buttons[0].props('to')).toBe(getUrlForPage(2)) // prevButton
    expect(buttons[1].props('to')).toBe(getUrlForPage(1)) // 1 button
    expect(buttons[2].props('to')).toBe(getUrlForPage(2)) // 2 button
    expect(buttons[3].props('to')).toBe(getUrlForPage(3)) // 3 button
    expect(buttons[4].props('to')).toBe(getUrlForPage(4)) // 4 button
    expect(buttons[5].props('to')).toBe(getUrlForPage(5)) // 5 button
    expect(buttons[6].props('to')).toBe(getUrlForPage(4)) // nextButton
  })
})
