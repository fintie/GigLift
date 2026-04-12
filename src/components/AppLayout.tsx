import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/onboarding', label: 'Intake' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/property-intel', label: 'Insights' },
]

export function AppLayout() {
  return (
    <div className="app-shell app-shell--light">
      <header className="app-header app-header--light">
        <Link className="brand" to="/">
          <span className="brand__mark brand__mark--light">PMS</span>
          <div>
            <strong>Property Management System</strong>
            <span>Greater Sydney operations</span>
          </div>
        </Link>
        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link')}
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
