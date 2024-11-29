import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import Sidebar from './Sidebar'

// Mock the SidebarLink component to avoid unnecessary complexity
jest.mock('./SidebarLink', () => {
  const MockSidebarLink = ({ icon, label }) => (
    <div data-testid="sidebar-link">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  )
  MockSidebarLink.displayName = 'MockSidebarLink'
  return MockSidebarLink
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <span data-testid={`icon-${icon.iconName}`} />,
}))

describe('Sidebar Component', () => {
  const mockRoutes = {
    dashboard: { path: '/app/dashboard', icon: 'home', label: 'Dashboard' },
    settings: { path: '/app/settings', icon: 'cog', label: 'Settings' },
  }

  const renderSidebar = (routes = mockRoutes) =>
    render(
      <BrowserRouter>
        <Sidebar routes={routes} />
      </BrowserRouter>,
    )

  test('renders the Sidebar component', () => {
    renderSidebar()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  test('renders all routes as SidebarLink components', () => {
    renderSidebar()
    const links = screen.getAllByTestId('sidebar-link')
    expect(links.length).toBe(Object.keys(mockRoutes).length)
  })

  test('renders the toggle button', () => {
    renderSidebar()
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()
  })

  test('toggles the sidebar width when the button is clicked', () => {
    renderSidebar()
    const toggleButton = screen.getByRole('button')
    const sidebar = screen.getByRole('navigation')

    // Initial state: sidebar should have 'w-20' class
    expect(sidebar).toHaveClass('w-20')

    // Simulate click to expand
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveClass('w-60')

    // Simulate click to collapse
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveClass('w-20')
  })

  test('renders a link to the dashboard', () => {
    renderSidebar()
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/app/dashboard')
  })
})
