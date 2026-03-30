/**
 * Deterministic hash from a string — same input always produces same output.
 */
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

/**
 * Seeded pseudo-random number in [0, 1) from an integer seed.
 */
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/**
 * Picks a quest deterministically for a given date string.
 * Same date + same pool = same quest every time.
 */
export function selectQuestForDate(allQuests, dateStr) {
  if (!allQuests || allQuests.length === 0) return null
  const seed = hashString(dateStr)
  const idx = Math.floor(seededRandom(seed) * allQuests.length)
  return allQuests[idx]
}

/**
 * Picks a reroll quest: different category from current, deterministic per date.
 */
export function rerollQuest(allQuests, currentCategory, dateStr) {
  if (!allQuests || allQuests.length === 0) return null
  const pool = allQuests.filter((q) => q.category !== currentCategory)
  if (pool.length === 0) return allQuests[0]
  const seed = hashString(dateStr + '-reroll')
  const idx = Math.floor(seededRandom(seed) * pool.length)
  return pool[idx]
}

/**
 * Fetches and flattens all quest JSON files listed in index.json.
 */
export async function loadAllQuests() {
  const manifest = await fetch('/quests/index.json').then((r) => r.json())
  const results = await Promise.all(
    manifest.files.map((path) => fetch(`/quests/${path}`).then((r) => r.json()))
  )
  return results.flat()
}
