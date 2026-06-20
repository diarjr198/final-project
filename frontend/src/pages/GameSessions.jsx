import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Table from '../components/ui/Table'

const columns = [
  { key: 'no', label: 'No', render: (_, index) => index + 1 },
  { key: 'created_at', label: 'Tanggal', render: (row) => new Date(row.created_at).toLocaleString() },
  { key: 'level', label: 'Level' }, { key: 'duration', label: 'Durasi' }, { key: 'accuracy', label: 'Akurasi' },
  { key: 'correct_words', label: 'Benar' }, { key: 'wrong_words', label: 'Salah' }, { key: 'score', label: 'Skor' },
]

export default function GameSessions() {
  const [rows, setRows] = useState([])
  const [filters, setFilters] = useState({ search: '', score_desc: true })

  const load = useCallback(async () => {
    const { data } = await api.get('/game-sessions', { params: filters })
    setRows(data.data || [])
  }, [filters])

  useEffect(() => { setTimeout(load, 0) }, [load])

  return <div className="stack"><h1>Data Permainan</h1><div className="toolbar"><Input label="Cari level" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} /><Button onClick={load}>Cari</Button></div><Table columns={columns} rows={rows} renderActions={(row) => <Button as={Link} to={`/game-sessions/${row.id}`}>Detail</Button>} /></div>
}
