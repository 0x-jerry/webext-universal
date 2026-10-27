import type { LinkItem } from './components/LinkSection.vue'

export const TOP_SITES_LIMIT = 50

const WINDOW_MS = 90 * 24 * 60 * 60 * 1000
// Time-windowed scan instead of the whole history: recent visits decide the ranking.
// Raise MAX_WINDOWS if a deeper history is ever needed.
const MAX_WINDOWS = 8
const MAX_RESULTS_PER_WINDOW = 1000
const MAX_SCAN_MS = 4000

type HistoryEntry = Pick<Browser.history.HistoryItem, 'url' | 'title' | 'visitCount'>

export function rankTopSites(entries: Iterable<HistoryEntry>): LinkItem[] {
  const byUrl = new Map<string, LinkItem>()
  let visits = new Map<string, number>()

  for (const entry of entries) {
    const { url, title } = entry
    if (!url || !title) continue

    const count = entry.visitCount ?? 0
    if (count > (visits.get(url) ?? 0)) {
      visits.set(url, count)
      byUrl.set(url, { label: title, url })
    }
  }

  return [...visits]
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_SITES_LIMIT)
    .map(([url]) => byUrl.get(url)!)
}

export async function scanTopSites(): Promise<LinkItem[]> {
  const startedAt = Date.now()
  const entries = new Map<string, HistoryEntry>()

  for (let i = 0, endTime = startedAt; i < MAX_WINDOWS; i++, endTime -= WINDOW_MS) {
    const startTime = endTime - WINDOW_MS
    const items = await browser.history.search({
      text: '',
      startTime,
      endTime,
      maxResults: MAX_RESULTS_PER_WINDOW,
    })

    for (const item of items) {
      if (item.url) entries.set(item.url, item)
    }

    const exhausted = items.length < MAX_RESULTS_PER_WINDOW
    if (exhausted || Date.now() - startedAt > MAX_SCAN_MS) break
  }

  return rankTopSites(entries.values())
}
