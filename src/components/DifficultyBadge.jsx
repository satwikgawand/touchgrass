const difficultyStyles = {
  easy: 'text-[#00ff41] border-[#00ff41]/40 bg-[#00ff41]/5',
  medium: 'text-[#ffb300] border-[#ffb300]/40 bg-[#ffb300]/5',
  hard: 'text-red-400 border-red-400/40 bg-red-400/5',
}

const difficultyLabels = {
  easy: '[ EASY ]',
  medium: '[ MED ]',
  hard: '[ HARD ]',
}

export default function DifficultyBadge({ difficulty }) {
  const style = difficultyStyles[difficulty] || 'text-gray-400 border-gray-400/40 bg-gray-400/5'
  const label = difficultyLabels[difficulty] || `[ ${difficulty?.toUpperCase()} ]`
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-medium tracking-widest ${style}`}
    >
      {label}
    </span>
  )
}
