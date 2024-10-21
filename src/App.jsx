import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import AuthProvider from './state/AuthProvider/AuthProvider'
import Homepage from './views/Homepage'
import LoginForm from './components/LoginForm/LoginForm'; 

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes*/}
          {/* <Route path="/login" element={<LoginForm />} /> */}
          <Route path="/login" element={<LoginForm />} /> {/** Render homepage for now */}
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
