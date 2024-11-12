import { auth } from '@config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createContext, useContext, useState, useEffect } from 'react'

import useLocalStorage from '@hooks/useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('me')
  const [isLoading, setIsLoading] = useState(true) // Track the loading state

  useEffect(() => {
    setIsLoading(false) // Stop loading after checking localStorage
  }, [])

  const login = async (loginEmail, loginPassword) => {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

    const token = await userCredential.user.getIdToken()

    const uuid = userCredential.user.uid
    const metadata = userCredential.user.metadata // Contains creation time, last sign-in time, etc.
    const providerData = userCredential.user.providerData // Information about the auth provider

    // Store the token, uuid, and metadata in localStorage
    const userData = {
      token, // JWT token
      uuid, // Unique User ID (UUID)
      metadata, // User's metadata
      providerData, // Provider details
    }
    setUser(userData)
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
