import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AppLayout } from '@components/AppLayout'
import { ProtectedRoutes } from '@components/ProtectedRoutes'
import { AuthProvider } from '@state/AuthProvider/AuthProvider'
import { Dashboard } from '@views/Dashboard'
import { Login } from '@views/Login'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes*/}
          {/* <Route path="/login" element={<LoginForm />} /> */}
          <Route path="/login" element={<Login />} /> {/** Render homepage for now */}
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
