import { ref } from 'vue'
import type { Ref } from 'vue'

export enum ToastType {
  success = 'success',
  error = 'error',
  info = 'info',
}

export type UseToastReturnType = {
  isVisible: Ref<boolean>
  message: Ref<string>
  type: Ref<ToastType>
  showToast: (msg: string, toastType?: ToastType, duration?: number) => void
}

export function useToast(): UseToastReturnType {
  const isVisible = ref(false)
  const message = ref('')
  const type = ref<ToastType>(ToastType.success)

  const showToast = (
    msg: string,
    toastType = ToastType.success,
    duration = 5000,
  ) => {
    message.value = msg
    type.value = toastType
    isVisible.value = true
    setTimeout(() => {
      //   isVisible.value = false
    }, duration)
  }

  return { isVisible, message, type, showToast }
}
