import { useEffect, useMemo, useState } from 'react'
import { wordPools } from '../data/words'
import { calculateAccuracy, calculateScore, calculateWpm, levelConfig, pickWord } from '../utils/game'

export default function useTypingShooterGame(level) {
  const config = levelConfig[level]
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(config.duration)
  const [input, setInput] = useState('')
  const [enemies, setEnemies] = useState([])
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [combo, setCombo] = useState(0)

  function start() {
    setRunning(true)
    setTimeLeft(config.duration)
    setEnemies([])
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setCombo(0)
    setInput('')
  }

  function submit(value) {
    const text = value.trim().toLowerCase()
    if (!text || !running) return
    const enemy = enemies.find((item) => item.word === text)
    if (enemy) {
      const nextCombo = combo + 1
      setEnemies((items) => items.filter((item) => item.id !== enemy.id))
      setCombo(nextCombo)
      setCorrect((count) => count + 1)
      setScore((points) => points + calculateScore(enemy.originalWord || enemy.word, nextCombo))
    } else {
      setCombo(0)
      setWrong((count) => count + 1)
      setScore((points) => Math.max(0, points + calculateScore(text, 0, true)))
    }
    setInput('')
  }

  function hitEnemyChar(enemyId) {
    const enemy = enemies.find((item) => item.id === enemyId)
    if (!enemy || !running) return
    const nextWord = enemy.word.slice(1)
    if (nextWord) {
      setEnemies((items) => items.map((item) => item.id === enemyId ? { ...item, word: nextWord } : item))
      return
    }
    const nextCombo = combo + 1
    setEnemies((items) => items.filter((item) => item.id !== enemyId))
    setCombo(nextCombo)
    setCorrect((count) => count + 1)
    setScore((points) => points + calculateScore(enemy.originalWord || enemy.word, nextCombo))
  }

  function missChar(char) {
    if (!char || !running) return
    setCombo(0)
    setWrong((count) => count + 1)
    setScore((points) => Math.max(0, points + calculateScore(char, 0, true)))
  }

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setTimeLeft((time) => Math.max(0, time - 1)), 1000)
    return () => clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (!running) return
    const spawnEnemy = () => {
      const word = pickWord(wordPools[level])
      setEnemies((items) => [...items.slice(-7), { id: crypto.randomUUID(), word, originalWord: word, x: Math.random() * 80 + 5 }])
    }
    spawnEnemy()
    const spawner = setInterval(spawnEnemy, config.spawnMs)
    return () => clearInterval(spawner)
  }, [running, level, config.spawnMs])

  useEffect(() => {
    if (timeLeft !== 0) return
    setTimeout(() => {
      setRunning(false)
      setEnemies([])
    }, 0)
  }, [timeLeft])

  const stats = useMemo(() => ({
    level,
    score,
    accuracy: calculateAccuracy(correct, wrong),
    duration: config.duration - timeLeft || 1,
    correct_words: correct,
    wrong_words: wrong,
    wpm: calculateWpm(correct, config.duration - timeLeft || 1),
  }), [level, score, correct, wrong, timeLeft, config.duration])

  return { config, running, timeLeft, input, setInput, enemies, score, correct, wrong, combo, stats, start, submit, hitEnemyChar, missChar }
}
