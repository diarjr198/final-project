import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PageShell from './components/layout/PageShell'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { AuthProvider, useAuth } from './context/AuthContext'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Game from './pages/Game'
import GameSessionDetail from './pages/GameSessionDetail'
import GameSessions from './pages/GameSessions'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/game" element={<Game />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/game-sessions" element={<PrivateRoute><GameSessions /></PrivateRoute>} />
            <Route path="/game-sessions/:id" element={<PrivateRoute><GameSessionDetail /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </PageShell>
      </BrowserRouter>
    </AuthProvider>
  )
}
