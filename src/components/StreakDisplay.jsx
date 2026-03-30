export default function StreakDisplay({ streak, bestStreak }) {
  return (
    <div className="flex gap-6 font-mono text-sm">
      <div className="flex items-center gap-2">
        <span className="text-[#00ff41]/50">&gt;</span>
        <span className="text-gray-500 tracking-widest uppercase text-xs">streak</span>
        <span className="text-[#00ff41] font-bold text-lg tabular-nums">{streak}</span>
        <span className="text-gray-600 text-xs">
          {streak === 1 ? 'day' : 'days'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#ffb300]/50">&gt;</span>
        <span className="text-gray-500 tracking-widest uppercase text-xs">best</span>
        <span className="text-[#ffb300] font-bold text-lg tabular-nums">{bestStreak}</span>
        <span className="text-gray-600 text-xs">
          {bestStreak === 1 ? 'day' : 'days'}
        </span>
      </div>
    </div>
  )
}
