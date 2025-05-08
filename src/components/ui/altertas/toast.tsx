'use client'

import Swal from 'sweetalert2'

interface ToastAlertProps {
  title: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  timer?: number
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  toast?: boolean
}

export function showToastAlert({
  title,
  text = '',
  icon,
  timer = 3000,
  position,
  toast,
}: ToastAlertProps) {
  Swal.fire({
    title,
    text,
    icon,
    timer,
    toast: toast,
    position,
    showConfirmButton: true,
  })
}
