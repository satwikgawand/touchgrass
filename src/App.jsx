import { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import { loadState, saveState } from './lib/storage'
import { loadAllQuests, selectQuestForDate, rerollQuest } from './lib/questEngine'
import { reconcileState, buildInitialState, recordHistory, getTodayStr } from './lib/streakLogic'
import HeroSection from './components/HeroSection'
import QuestCard from './components/QuestCard'
import QuestHistory from './components/QuestHistory'

// Off-screen share card colors per category
const categoryColors = {
  social: '#60a5fa',
  body: '#4ade80',
  mind: '#c084fc',
  skill: '#fbbf24',
  chaos: '#f87171',
}

export default function App() {
  const [appState, setAppState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [animating, setAnimating] = useState(false)
  const [allQuests, setAllQuests] = useState([])
  const shareCardRef = useRef(null)

  // Boot: load state + quests
  useEffect(() => {
    async function boot() {
      try {
        const quests = await loadAllQuests()
        setAllQuests(quests)

        const stored = loadState()
        let state = reconcileState(stored)
        const today = getTodayStr()

        if (!state) {
          // First-ever visit
          const quest = selectQuestForDate(quests, today)
          state = buildInitialState(quest)
        } else if (!state.currentQuest) {
          // New day — select fresh quest
          state.currentQuest = selectQuestForDate(quests, today)
        }

        saveState(state)
        setAppState(state)
      } catch (err) {
        console.error('Boot failed:', err)
      } finally {
        setLoading(false)
      }
    }

    boot()
  }, [])

  function persist(newState) {
    setAppState(newState)
    saveState(newState)
  }

  function handleComplete() {
    if (!appState || appState.done) return

    const updatedHistory = recordHistory(appState, 'completed')
    const newStreak = appState.streak + 1
    const newBestStreak = Math.max(appState.bestStreak, newStreak)

    persist({
      ...appState,
      done: true,
      streak: newStreak,
      bestStreak: newBestStreak,
      history: updatedHistory,
    })
  }

  function handleReroll() {
    if (!appState || appState.rerollsUsed >= 1 || appState.done) return

    // Record the rerolled quest in history first
    const updatedHistory = recordHistory(appState, 'rerolled')

    const newQuest = rerollQuest(allQuests, appState.currentQuest?.category, appState.currentDate)

    // Animate transition
    setAnimating(true)
    setTimeout(() => {
      persist({
        ...appState,
        currentQuest: newQuest,
        rerollsUsed: 1,
        history: updatedHistory,
      })
      setAnimating(false)
    }, 300)
  }

  async function handleShare() {
    if (!appState?.currentQuest || !shareCardRef.current) return

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#0d0d0d',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Canvas blob failed')

        const file = new File([blob], 'touchgrass-quest.png', { type: 'image/png' })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Touch Grass',
              text: `Today's quest: ${appState.currentQuest.title} — touchgrass.brnrot.fun`,
            })
            return
          } catch {
            // cancelled or unsupported — fall through
          }
        }

        // Fallback: download image
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'touchgrass-quest.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch {
      // Final fallback: copy text
      try {
        const q = appState.currentQuest
        await navigator.clipboard.writeText(
          `Touch Grass — Today's Quest\n\n${q.title}\n\n${q.flavour}\n\ntouchgrass.brnrot.fun`
        )
      } catch {
        // nothing
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <p className="font-mono text-[#00ff41] text-sm animate-pulse tracking-widest">
          &gt; LOADING QUEST DATABASE...
        </p>
      </div>
    )
  }

  const quest = appState?.currentQuest
  const accentColor = quest ? (categoryColors[quest.category] || '#00ff41') : '#00ff41'

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-mono">
      {/* Hero */}
      <HeroSection />

      {/* Quest section */}
      <section id="quest-section" className="max-w-2xl mx-auto px-4 py-16 space-y-8">
        <QuestCard
          quest={quest}
          done={appState?.done ?? false}
          rerollsUsed={appState?.rerollsUsed ?? 0}
          streak={appState?.streak ?? 0}
          bestStreak={appState?.bestStreak ?? 0}
          onComplete={handleComplete}
          onReroll={handleReroll}
          onShare={handleShare}
          animating={animating}
        />
      </section>

      {/* History */}
      <QuestHistory history={appState?.history ?? []} />

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8 text-center">
        <p className="font-mono text-xs text-gray-700 tracking-widest">
          TOUCHGRASS.BRNROT.FUN — DON'T BE AN NPC
        </p>
      </footer>

      {/* Off-screen share card (captured by html2canvas) */}
      {quest && (
        <div
          ref={shareCardRef}
          style={{
            position: 'fixed',
            left: '-9999px',
            top: 0,
            width: '600px',
            padding: '48px',
            backgroundColor: '#0d0d0d',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            color: '#ffffff',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <p style={{ color: '#00ff41', fontSize: '11px', letterSpacing: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
              &gt; SIDE QUEST ASSIGNED
            </p>
            <h1 style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '-1px', lineHeight: 1, color: '#ffffff', margin: 0 }}>
              TOUCH <span style={{ color: '#00ff41' }}>GRASS</span>
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <span style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: '4px',
              border: `1px solid ${accentColor}66`, color: accentColor,
              backgroundColor: `${accentColor}11`, fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase',
            }}>
              {quest.category}
            </span>
            <span style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: '4px',
              border: '1px solid #3a3a3a', color: '#888888',
              backgroundColor: '#1a1a1a', fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase',
            }}>
              {quest.difficulty}
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '600', lineHeight: '1.4', color: '#ffffff', marginBottom: '20px', marginTop: 0 }}>
            {quest.title}
          </h2>

          <p style={{
            fontSize: '14px', color: '#888888', fontStyle: 'italic',
            lineHeight: '1.6', borderLeft: `2px solid ${accentColor}44`,
            paddingLeft: '16px', marginBottom: '32px',
          }}>
            {quest.flavour}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2a2a2a', paddingTop: '20px' }}>
            <p style={{ fontSize: '11px', color: '#444444', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
              ⏱ {quest.duration}
            </p>
            <p style={{ fontSize: '12px', color: '#00ff41', letterSpacing: '2px', margin: 0 }}>
              touchgrass.brnrot.fun
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
