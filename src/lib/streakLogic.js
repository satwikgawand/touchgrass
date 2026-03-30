export function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function getDateStr(date) {
  return date.toISOString().split('T')[0]
}

function addDays(dateStr, n) {
  const d = new Date(dateStr)
  d.setUTCDate(d.getUTCDate() + n)
  return getDateStr(d)
}

/**
 * Called on every app load. Reconciles stored state against today's date.
 *
 * Rules:
 * - Same day → return state unchanged
 * - New day, previous day was completed → streak + 1
 * - New day, previous day was visited but NOT completed → streak resets to 0
 * - Multi-day gap (missed days) → streak stays as-is (absence ≠ skip)
 *
 * Returns null if state is null (first visit).
 */
export function reconcileState(state) {
  if (!state) return null

  const today = getTodayStr()

  // Same day — nothing to do
  if (state.currentDate === today) return state

  const dayAfterStored = addDays(state.currentDate, 1)
  const isConsecutiveDay = dayAfterStored === today

  let newStreak = state.streak
  let newBestStreak = state.bestStreak || 0

  if (isConsecutiveDay) {
    // Consecutive day transition
    if (state.done) {
      // Completed yesterday → extend streak
      newStreak = state.streak + 1
    } else {
      // Visited yesterday but didn't complete → skip breaks streak
      newStreak = 0
    }
  }
  // else: gap day — streak stays unchanged (absence is not a skip)

  newBestStreak = Math.max(newBestStreak, newStreak)

  return {
    ...state,
    currentDate: today,
    currentQuest: null, // will be re-selected for today
    done: false,
    rerollsUsed: 0,
    streak: newStreak,
    bestStreak: newBestStreak,
  }
}

/**
 * Builds the initial fresh state for a first-time visitor.
 */
export function buildInitialState(quest) {
  return {
    currentQuest: quest,
    currentDate: getTodayStr(),
    done: false,
    rerollsUsed: 0,
    streak: 0,
    bestStreak: 0,
    history: [],
  }
}

/**
 * Records the outcome of today's quest into history.
 * Outcome: 'completed' | 'skipped' | 'rerolled'
 */
export function recordHistory(state, outcome) {
  const entry = {
    date: state.currentDate,
    quest: state.currentQuest,
    outcome,
  }
  const updated = [entry, ...(state.history || [])]
  // Keep max 90 days stored
  return updated.slice(0, 90)
}
