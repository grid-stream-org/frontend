// Routes for Sidebar componentimport 

export const routes = {
  classes: { path: '/', icon: 'table-columns', label: 'Classes' },
  settings: { path: '/settings', icon: 'gear', label: 'Settings' },
  dashboard: { path: '/dashboard', icon: 'table-columns', label: 'Dashboard' }
}

export const getTitle = pathname => {
  const key = pathname.replace('/', '')
  return key === '' ? routes.classes.label : routes[key].label
}
