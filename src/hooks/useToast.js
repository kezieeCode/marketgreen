import { useState, useCallback } from 'react'

let toastIdCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = ++toastIdCounter
    const toast = { id, message, type, duration }
    
    setToasts((prev) => [...prev, toast])
    
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, showToast, removeToast }
}
