import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import AuthProvider from './state/AuthProvider/AuthProvider'
import Homepage from './views/Homepage'
import Login from './views/Login'
import Dashboard from './views/Dashboard'

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
              <Route index element={<Homepage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
