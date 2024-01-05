import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import Toast from '../../../components/common/Toast.vue'
import { ToastType } from '../../../composables/useToast'

describe('Toast.vue', () => {
  it('shows success message', async () => {
    const wrapper = mount(Toast, {
      global: {
        provide: {
          toast: {
            isVisible: true,
            message: 'Success message',
            type: ToastType.success,
          },
        },
      },
    })
    const el = wrapper.find('[data-test-id="toast"]')
    expect(el.isVisible()).toBe(true)
    expect(el.text()).toBe('Success message')
  })

  it('has correct success message class', async () => {
    const wrapper = mount(Toast, {
      global: {
        provide: {
          toast: {
            isVisible: true,
            message: 'Success message',
            type: ToastType.success,
          },
        },
      },
    })
    expect(wrapper.find('[data-test-id="toast"]').classes()).toContain(
      'bg-green-500',
    )
  })

  it('has correct error message class', async () => {
    const wrapper = mount(Toast, {
      global: {
        provide: {
          toast: {
            isVisible: true,
            message: 'Error message',
            type: ToastType.error,
          },
        },
      },
    })
    expect(wrapper.find('[data-test-id="toast"]').classes()).toContain(
      'bg-red-500',
    )
  })

  it('does not show when hidden', async () => {
    const wrapper = mount(Toast, {
      global: {
        provide: {
          toast: {
            isVisible: false,
            message: 'Success message',
            type: ToastType.success,
          },
        },
      },
    })
    expect(wrapper.find('[data-test-id="toast"]').exists()).toBe(false)
  })
})
