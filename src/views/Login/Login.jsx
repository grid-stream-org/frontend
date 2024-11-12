// import axios from 'axios'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { TextField, InputAdornment } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Button from '../../components/Button'
import Card from '../../components/Card'
import { auth } from '../../config/firebaseConfig'
import { useAuth } from '../../state/AuthProvider/AuthProvider'

const Login = () => {
  // State hooks for login email, password, loading, and error message
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Loading state for login request

  const { login } = useAuth() // Get login function from AuthProvider
  const navigate = useNavigate() // React Router hook for navigation
  const location = useLocation()

  // Event handlers for email, password
  const onEmailChange = event => {
    setLoginEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setLoginPassword(event.target.value)
  }

  useEffect(() => {
    if (location.state?.invalidToken) {
      setErrorMessage(
        'Invalid invite token. Please log in or contact your instructor or administrator',
      )
    }
  }, [location.state])

  // Event handler for form submission
  const onSubmitLogin = async event => {
    event.preventDefault() // Prevent form from refreshing page
    setIsLoading(true) // Set loading state to true

    try {
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

      // localStorage.setItem('user', JSON.stringify(userData));

      await login(userData)

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Incorrect email or password')

      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setErrorMessage('Incorrect email or password')
      } else {
        setErrorMessage('Login failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <Card width="400px" height="600px" className="flex justify-center items-center">
        <div className="flex flex-col items-center p-7 gap-5 w-full">
          {/* <Logo withText={true} coloured={true} className="p-3" /> Insert logo here */}
          <h2 className="text-2xl">Welcome</h2>
          <p>Sign in to continue to GridStream</p>
          <form className="flex flex-col gap-6 w-full" onSubmit={onSubmitLogin}>
            <TextField
              className="p-3 rounded-md border border-primary"
              type="email"
              id="email"
              placeholder="Email"
              required
              value={loginEmail}
              onChange={onEmailChange}
              disabled={isLoading} // Disable input when loading
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="p-3 rounded-md border border-primary"
              type="password"
              id="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={onPasswordChange}
              disabled={isLoading} // Disable input when loading
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <Button type="submit" style={{ height: '50px' }} isLoading={isLoading}>
              Login
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Login
