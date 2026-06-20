import { useState } from 'react'
import api from '../api/client'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, refreshProfile } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', username: user?.username || '', email: user?.email || '', avatar: user?.avatar || '', password: '', password_confirmation: '' })
  const [message, setMessage] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(event) {
    event.preventDefault()
    await api.put('/profile', form)
    await refreshProfile()
    setMessage('Profil diperbarui.')
  }

  return <Card className="form-card"><h1>Profil</h1><form onSubmit={submit} className="form"><Input label="Nama" value={form.name} onChange={set('name')} /><Input label="Username" value={form.username} onChange={set('username')} /><Input label="Email" type="email" value={form.email} onChange={set('email')} /><Input label="Foto Profil URL" value={form.avatar} onChange={set('avatar')} /><Input label="Password Baru" type="password" value={form.password} onChange={set('password')} /><Input label="Konfirmasi Password" type="password" value={form.password_confirmation} onChange={set('password_confirmation')} /><p className="muted">Bergabung: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</p>{message && <p className="success">{message}</p>}<Button>Simpan</Button></form></Card>
}
