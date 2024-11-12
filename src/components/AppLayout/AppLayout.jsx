import { Outlet } from 'react-router-dom'

import { Header } from '@components/Header'
import { Sidebar } from '@components/Sidebar'

import { routes } from './routes'

const AppLayout = () => {
  return (
    <div className="flex h-svh">
      <Sidebar routes={routes} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex flex-col flex-1 overflow-y-auto bg-light p-6 z-30">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
