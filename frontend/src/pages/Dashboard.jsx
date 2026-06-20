import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import StatCard from '../components/ui/StatCard'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, stats } = useAuth()
  return <div className="stack"><h1>Selamat Datang, {user?.name}</h1><div className="grid four"><StatCard label="Total Permainan" value={stats?.total_games} /><StatCard label="Total Skor" value={stats?.total_score} /><StatCard label="Skor Tertinggi" value={stats?.best_score} /><StatCard label="Ranking" value={stats?.rank || '-'} /></div><Button as={Link} to="/game">Mulai Bermain</Button></div>
}
