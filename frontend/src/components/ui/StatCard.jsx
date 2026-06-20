import Card from './Card'

export default function StatCard({ label, value }) {
  return <Card><span className="muted">{label}</span><strong className="stat-value">{value ?? 0}</strong></Card>
}
