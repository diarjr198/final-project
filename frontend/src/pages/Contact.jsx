import { useState } from 'react'
import api from '../api/client'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(event) {
    event.preventDefault()
    await api.post('/contact', form)
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return <Card className="form-card"><h1>Contact</h1><form onSubmit={submit} className="form"><Input label="Nama" value={form.name} onChange={set('name')} /><Input label="Email" type="email" value={form.email} onChange={set('email')} /><Input label="Subjek" value={form.subject} onChange={set('subject')} /><label className="field"><span>Pesan</span><textarea value={form.message} onChange={set('message')} /></label>{sent && <p className="success">Pesan terkirim.</p>}<Button>Kirim Pesan</Button></form></Card>
}
