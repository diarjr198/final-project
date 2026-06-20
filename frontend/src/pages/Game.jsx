import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../api/client'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'
import useTypingShooterGame from '../hooks/useTypingShooterGame'

export default function Game() {
  const { user, refreshProfile } = useAuth()
  const [level, setLevel] = useState('easy')
  const [saved, setSaved] = useState('')
  const [autosaved, setAutosaved] = useState(false)
  const inputRef = useRef(null)
  const arenaRef = useRef(null)
  const game = useTypingShooterGame(level)

  function centerArena() {
    arenaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    inputRef.current?.focus()
  }

  function start() {
    setSaved('')
    setAutosaved(false)
    game.start()
    setTimeout(centerArena, 0)
  }

  const save = useCallback(async () => {
    if (!user) {
      setSaved('Login dulu untuk simpan skor.')
      setAutosaved(true)
      return
    }
    await api.post('/game-sessions', game.stats)
    await refreshProfile()
    setSaved('Skor tersimpan otomatis.')
    setAutosaved(true)
  }, [user, game.stats, refreshProfile])

  function submit(event) {
    event.preventDefault()
    game.submit(game.input)
    centerArena()
  }

  useEffect(() => {
    if (!game.running && game.stats.duration > 1 && !autosaved) setTimeout(save, 0)
  }, [game.running, game.stats.duration, autosaved, save])

  return (
    <div className="stack game-page">
      <div className="toolbar">
        <h1>Typing Shooter</h1>
        <select value={level} onChange={(e) => setLevel(e.target.value)} disabled={game.running}>
          {['easy', 'medium', 'hard'].map((item) => <option key={item}>{item}</option>)}
        </select>
        <Button onClick={start}>{game.running ? 'Restart' : 'Start'}</Button>
      </div>
      <Card className="arena" ref={arenaRef}>
        <div className="hud"><span>Time: {game.timeLeft}s</span><span>Score: {game.score}</span><span>Combo: {game.combo}</span><span>Accuracy: {game.stats.accuracy}%</span></div>
        {game.running && game.enemies.map((enemy, index) => <div key={enemy.id} className="enemy" style={{ left: `${enemy.x}%`, top: `${18 + index * 9}%` }}>{enemy.word}</div>)}
        <form onSubmit={submit}><input ref={inputRef} className="game-input" autoFocus value={game.input} onFocus={centerArena} onChange={(e) => { game.setInput(e.target.value); centerArena() }} placeholder="Ketik kata musuh lalu Enter" /></form>
      </Card>
      {saved && <p className="muted">{saved}</p>}
    </div>
  )
}
