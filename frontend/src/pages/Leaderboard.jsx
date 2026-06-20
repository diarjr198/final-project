import { useEffect, useState } from 'react'
import api from '../api/client'
import StatCard from '../components/ui/StatCard'
import Table from '../components/ui/Table'

const columns = [{ key: 'rank', label: 'Rank' }, { key: 'user', label: 'Pemain', render: (row) => row.user?.username }, { key: 'best_score', label: 'Top Skor' }, { key: 'total_score', label: 'Total Skor' }, { key: 'total_games', label: 'Main' }]

export default function Leaderboard() {
  const [data, setData] = useState({ leaderboard: [] })
  useEffect(() => { api.get('/leaderboard').then((res) => setData(res.data)) }, [])
  return <div className="stack"><h1>Leaderboard</h1><div className="grid three"><StatCard label="Jumlah Pemain" value={data.players} /><StatCard label="Total Permainan" value={data.total_games} /><StatCard label="Top Skor" value={data.top_score} /></div><Table columns={columns} rows={data.leaderboard} /></div>
}
