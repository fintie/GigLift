import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/onboarding', label: 'Onboarding' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/marketplace', label: 'Marketplace' },
]

export function AppLayout() {
  return (
    <div className="app-frame">
      <header className="app-topbar">
        <Link to="/" className="brand-mark">
          <span className="brand-mark__badge">GigHub</span>
          <div>
            <strong>AI-first task execution</strong>
            <small>Human fallback only when needed</small>
          </div>
        </Link>
        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
