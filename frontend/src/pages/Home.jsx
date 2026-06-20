import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Home() {
  return (
    <div className="stack">
      <section className="hero-panel">
        <p className="eyebrow">Sci-Fi Typing Shooter</p>
        <h1>Menembak musuh dengan kecepatan mengetik.</h1>
        <p>Ketik kata pada musuh, jaga combo, raih skor tertinggi.</p>
        <Button as={Link} to="/game">Play Now</Button>
      </section>
      <div className="grid three">
        {['Ketik kata pada musuh', 'Musuh kalah saat kata benar', 'Combo cepat = bonus skor'].map((text) => <Card key={text}>{text}</Card>)}
      </div>
    </div>
  )
}
