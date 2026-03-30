import { useRef } from 'react'
import CategoryPill from './CategoryPill'
import DifficultyBadge from './DifficultyBadge'
import StreakDisplay from './StreakDisplay'

export default function QuestCard({
  quest,
  done,
  rerollsUsed,
  streak,
  bestStreak,
  onComplete,
  onReroll,
  onShare,
  animating,
}) {
  if (!quest) {
    return (
      <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-8 text-center">
        <p className="font-mono text-gray-500 text-sm animate-pulse">&gt; loading quest...</p>
      </div>
    )
  }

  const canReroll = rerollsUsed < 1 && !done
  const rerollLabel = rerollsUsed >= 1 ? '[ REROLL USED ]' : '[ REROLL ]'

  return (
    <div
      className={`rounded-lg border bg-[#1a1a1a] p-6 sm:p-8 space-y-6 transition-all duration-300 ${
        done
          ? 'border-[#00ff41]/40 shadow-[0_0_24px_rgba(0,255,65,0.12)]'
          : 'border-[#2a2a2a]'
      } ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
    >
      {/* Header: category + difficulty + duration */}
      <div className="flex flex-wrap items-center gap-2">
        <CategoryPill category={quest.category} />
        <DifficultyBadge difficulty={quest.difficulty} />
        <span className="ml-auto text-xs font-mono text-gray-600 tracking-wider">
          ⏱ {quest.duration}
        </span>
      </div>

      {/* Quest title */}
      <div className="space-y-2">
        <p className="text-[#00ff41]/50 font-mono text-xs tracking-widest uppercase">
          &gt; TODAY&apos;S QUEST
        </p>
        <h2 className="text-xl sm:text-2xl font-mono font-semibold text-white leading-snug">
          {quest.title}
        </h2>
      </div>

      {/* Flavour text */}
      <p className="font-mono text-sm text-gray-400 italic leading-relaxed border-l-2 border-[#2a2a2a] pl-4">
        {quest.flavour}
      </p>

      {/* Tags */}
      {quest.tags && quest.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {quest.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-gray-600 tracking-widest uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Completed banner */}
      {done && (
        <div className="rounded border border-[#00ff41]/30 bg-[#00ff41]/5 px-4 py-3 flex items-center gap-3">
          <span className="text-[#00ff41] text-lg">✓</span>
          <span className="font-mono text-sm text-[#00ff41]">
            QUEST COMPLETED. +1 to your streak.
          </span>
        </div>
      )}

      {/* Streak */}
      <StreakDisplay streak={streak} bestStreak={bestStreak} />

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        {!done && (
          <button
            onClick={onComplete}
            className="flex-1 min-w-[140px] px-4 py-3 font-mono text-sm font-medium tracking-widest uppercase rounded border border-[#00ff41]/60 text-[#00ff41] bg-[#00ff41]/5 hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all"
          >
            [ COMPLETE ]
          </button>
        )}

        <button
          onClick={onReroll}
          disabled={!canReroll}
          className={`flex-1 min-w-[140px] px-4 py-3 font-mono text-sm font-medium tracking-widest uppercase rounded border transition-all ${
            canReroll
              ? 'border-[#ffb300]/60 text-[#ffb300] bg-[#ffb300]/5 hover:bg-[#ffb300]/10 hover:border-[#ffb300]'
              : 'border-[#2a2a2a] text-gray-700 cursor-not-allowed'
          }`}
        >
          {rerollLabel}
        </button>

        <button
          onClick={onShare}
          className="px-4 py-3 font-mono text-sm font-medium tracking-widest uppercase rounded border border-[#2a2a2a] text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-all"
        >
          [ SHARE ]
        </button>
      </div>

      {/* Quest ID */}
      <p className="text-[10px] font-mono text-gray-700 tracking-widest">{quest.id}</p>
    </div>
  )
}
