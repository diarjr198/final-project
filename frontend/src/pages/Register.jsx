import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(event) {
    event.preventDefault()
    setError('')
    try { await register(form); navigate('/dashboard') } catch { setError('Registrasi gagal. Cek email/username/password.') }
  }

  return <Card className="form-card"><h1>Register</h1><form onSubmit={submit} className="form"><Input label="Nama Lengkap" value={form.name} onChange={set('name')} /><Input label="Username" value={form.username} onChange={set('username')} /><Input label="Email" type="email" value={form.email} onChange={set('email')} /><Input label="Password" type="password" value={form.password} onChange={set('password')} /><Input label="Konfirmasi Password" type="password" value={form.password_confirmation} onChange={set('password_confirmation')} />{error && <p className="error">{error}</p>}<Button>Register</Button><Link to="/login">Sudah punya akun?</Link></form></Card>
}
