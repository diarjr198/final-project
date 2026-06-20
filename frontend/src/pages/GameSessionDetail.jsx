import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/client'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'

export default function GameSessionDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  useEffect(() => { api.get(`/game-sessions/${id}`).then((res) => setData(res.data)) }, [id])
  const session = data?.session
  if (!session) return <p>Loading...</p>
  return <div className="stack"><h1>Detail Permainan #{session.id}</h1><Card><p>Pemain: {session.user?.name}</p><p>Tanggal: {new Date(session.created_at).toLocaleString()}</p><p>Level: {session.level}</p></Card><div className="grid four"><StatCard label="Skor" value={session.score} /><StatCard label="Akurasi" value={`${session.accuracy}%`} /><StatCard label="WPM" value={session.wpm} /><StatCard label="Durasi" value={`${session.duration}s`} /></div><Card><h2>Riwayat Skor Sebelumnya</h2>{data.previous_scores.map((row) => <p key={row.id}>{new Date(row.created_at).toLocaleDateString()} — {row.score} pts</p>)}</Card><div className="toolbar"><Button as={Link} to="/game-sessions">Kembali</Button><Button as={Link} to="/game">Main Lagi</Button></div></div>
}
