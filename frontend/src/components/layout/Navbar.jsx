import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

const links = ['Home', 'Dashboard', 'Leaderboard', 'Game Sessions', 'Profile', 'Contact']
const paths = { Home: '/', Dashboard: '/dashboard', Leaderboard: '/leaderboard', 'Game Sessions': '/game-sessions', Profile: '/profile', Contact: '/contact' }

export default function Navbar() {
  const { user, logout } = useAuth()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    function onScroll() {
      const currentY = window.scrollY
      setHidden(currentY > 80 && currentY >= lastY)
      lastY = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
      <Link to="/" className="brand">Typing Shooter</Link>
      <div className="nav-links">{links.map((link) => <NavLink key={link} to={paths[link]}>{link}</NavLink>)}</div>
      {user ? <Button variant="ghost" onClick={logout}>Logout</Button> : <Button as={Link} to="/login">Login</Button>}
    </nav>
  )
}
