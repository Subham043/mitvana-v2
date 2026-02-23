import { toast, type ExternalToast } from 'sonner'
import { Check, X, Info } from 'lucide-react'
import { useCallback } from 'react'

/*
 * Toast Hook Type
 */
type ToastHookType = () => {
  toastDismiss: () => void
  toastSuccess: (msg: string) => void
  toastError: (msg: string) => void
  toastInfo: (msg: string) => void
}

/*
 * Toast Configuration
 */
type ToastType = 'success' | 'error' | 'info'

const getToastConfig = (type: ToastType): ExternalToast => {
  const base: ExternalToast = {
    position: 'top-center',
    dismissible: true,
    duration: 3000,
  }

  switch (type) {
    case 'success':
      return {
        ...base,
        icon: <Check className="text-green-600" />,
        classNames: {
          toast: '!bg-green-50 !border !border-green-200',
          title: '!text-green-700 !font-semibold',
          description: '!text-green-600',
        },
      }

    case 'error':
      return {
        ...base,
        icon: <X className="text-red-600" />,
        classNames: {
          toast: '!bg-red-50 !border !border-red-200',
          title: '!text-red-700 !font-semibold',
          description: '!text-red-600',
        },
      }

    case 'info':
      return {
        ...base,
        icon: <Info className="text-blue-600" />,
        classNames: {
          toast: '!bg-blue-50 !border !border-blue-200',
          title: '!text-blue-700 !font-semibold',
          description: '!text-blue-600',
        },
      }
  }
}

export const toastDismiss = () => {
  toast.dismiss()
}

export const toastSuccess = (msg: string) => {
  toastDismiss()
  toast.success(msg, getToastConfig('success'))
}

export const toastError = (msg: string) => {
  toastDismiss()
  toast.error(msg, getToastConfig('error'))
}

export const toastInfo = (msg: string) => {
  toastDismiss()
  toast.info(msg, getToastConfig('info'))
}

/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useToast: ToastHookType = () => {
  const tDismiss = useCallback(toastDismiss, [])
  const tSuccess = useCallback(toastSuccess, [])
  const tError = useCallback(toastError, [])
  const tInfo = useCallback(toastInfo, [])
  return {
    toastDismiss: tDismiss,
    toastSuccess: tSuccess,
    toastError: tError,
    toastInfo: tInfo,
  }
}
