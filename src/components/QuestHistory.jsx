import HistoryRow from './HistoryRow'

export default function QuestHistory({ history }) {
  const displayed = (history || []).slice(0, 90)

  return (
    <section className="max-w-2xl mx-auto px-4 pb-24">
      <div className="mb-6">
        <p className="font-mono text-xs text-[#00ff41]/50 tracking-widest uppercase mb-1">
          &gt; QUEST LOG
        </p>
        <h3 className="font-mono text-lg font-semibold text-white">History</h3>
      </div>

      {displayed.length === 0 ? (
        <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-8 text-center space-y-3">
          <p className="font-mono text-gray-600 text-sm">no quest history yet.</p>
          <p className="font-mono text-gray-700 text-xs">
            complete or skip today's quest to start the log.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4">
          {displayed.map((entry, i) => (
            <HistoryRow key={`${entry.date}-${i}`} entry={entry} />
          ))}
          {history && history.length > 90 && (
            <p className="text-center py-4 font-mono text-xs text-gray-700">
              showing last 90 days
            </p>
          )}
        </div>
      )}
    </section>
  )
}
