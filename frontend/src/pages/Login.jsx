import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ login: '', password: '' })
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setError('')
    try { await login(form); navigate('/dashboard') } catch { setError('Login gagal.') }
  }

  return <Card className="form-card"><h1>Login</h1><form onSubmit={submit} className="form"><Input label="Email / Username" value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} /><Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{error && <p className="error">{error}</p>}<Button>Login</Button><Link to="/register">Belum punya akun?</Link></form></Card>
}
