import { createContext, useContext, useState } from 'react'

const NavigationContext = createContext()

export function NavigationProvider({ children }) {
  const [isNavigating, setIsNavigating] = useState(false)

  const setNavigating = (value) => {
    setIsNavigating(value)
  }

  return (
    <NavigationContext.Provider value={{ isNavigating, setNavigating }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}
