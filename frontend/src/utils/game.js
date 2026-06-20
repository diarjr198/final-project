export const levelConfig = {
  easy: { label: 'Easy', enemySpeed: 18, spawnMs: 2200, duration: 60 },
  medium: { label: 'Medium', enemySpeed: 28, spawnMs: 1700, duration: 60 },
  hard: { label: 'Hard', enemySpeed: 42, spawnMs: 1200, duration: 60 },
}

export function calculateScore(word, combo, isWrong = false) {
  if (isWrong) return -2
  const base = word.length >= 8 ? 20 : 10
  return base + Math.floor(combo / 3) * 5
}

export function calculateAccuracy(correct, wrong) {
  const total = correct + wrong
  return total ? Number(((correct / total) * 100).toFixed(2)) : 100
}

export function calculateWpm(correctWords, durationSeconds) {
  return durationSeconds ? Math.round(correctWords / (durationSeconds / 60)) : 0
}

export function pickWord(words) {
  return words[Math.floor(Math.random() * words.length)]
}
