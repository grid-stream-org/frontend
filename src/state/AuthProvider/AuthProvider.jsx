import { createContext, useContext, useState, useEffect } from 'react'

import useLocalStorage from '../../hooks/useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('me')
  const [isLoading, setIsLoading] = useState(true) // Track the loading state

  useEffect(() => {
    setIsLoading(false) // Stop loading after checking localStorage
  }, [])

  const login = async user => {
    setUser(user)
  }

  const logout = async () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
