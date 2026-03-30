import CategoryPill from './CategoryPill'
import DifficultyBadge from './DifficultyBadge'

const outcomeStyles = {
  completed: 'text-[#00ff41] border-[#00ff41]/30 bg-[#00ff41]/5',
  skipped: 'text-gray-600 border-gray-700 bg-gray-800/50',
  rerolled: 'text-[#ffb300] border-[#ffb300]/30 bg-[#ffb300]/5',
}

const outcomeLabels = {
  completed: '✓ done',
  skipped: '— skip',
  rerolled: '↻ reroll',
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  const day = date.toLocaleDateString('en-US', { weekday: 'short' })
  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return { day, formatted }
}

export default function HistoryRow({ entry }) {
  const { date, quest, outcome } = entry
  const { day, formatted } = formatDate(date)
  const outcomeStyle = outcomeStyles[outcome] || outcomeStyles.skipped
  const outcomeLabel = outcomeLabels[outcome] || outcome

  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#1a1a1a] group">
      {/* Date */}
      <div className="flex-none w-16 text-right">
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{day}</p>
        <p className="text-xs font-mono text-gray-500">{formatted}</p>
      </div>

      {/* Timeline dot */}
      <div className="flex-none flex flex-col items-center mt-1">
        <div
          className={`w-1.5 h-1.5 rounded-full mt-1 ${
            outcome === 'completed'
              ? 'bg-[#00ff41]'
              : outcome === 'rerolled'
              ? 'bg-[#ffb300]'
              : 'bg-gray-700'
          }`}
        />
        <div className="w-px flex-1 bg-[#2a2a2a] mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {quest && <CategoryPill category={quest.category} />}
          {quest && <DifficultyBadge difficulty={quest.difficulty} />}
        </div>
        <p className="text-sm font-mono text-gray-300 leading-snug truncate">
          {quest?.title || 'Unknown quest'}
        </p>
      </div>

      {/* Outcome chip */}
      <div className="flex-none">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono tracking-widest ${outcomeStyle}`}
        >
          {outcomeLabel}
        </span>
      </div>
    </div>
  )
}
