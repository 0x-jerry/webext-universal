import type { LinkItem } from './components/LinkSection.vue'

export const TOP_SITES_LIMIT = 50

const WINDOW_MS = 90 * 24 * 60 * 60 * 1000
// Time-windowed scan instead of the whole history: recent visits decide the ranking.
// Raise MAX_WINDOWS if a deeper history is ever needed.
const MAX_WINDOWS = 8
const MAX_RESULTS_PER_WINDOW = 10000
const MAX_SCAN_MS = 4000

type HistoryEntry = Pick<Browser.history.HistoryItem, 'url' | 'title' | 'visitCount'>

interface OriginSite extends LinkItem {
  visits: number
  pathDepth: number
}

export function rankTopSites(entries: Iterable<HistoryEntry>): LinkItem[] {
  const byOrigin = new Map<string, OriginSite>()

  for (const entry of entries) {
    const { url, title } = entry
    if (!url || !title) continue

    const parsed = URL.parse(url)
    if (!parsed?.host) continue

    // Non-special schemes (chrome://, extension pages) report a "null" origin, so fall back to their root.
    const origin = parsed.origin === 'null' ? `${parsed.protocol}//${parsed.host}` : parsed.origin
    const site = byOrigin.get(origin) ?? { label: title, url, visits: 0, pathDepth: Infinity }
    site.visits += entry.visitCount ?? 0

    // Closest to the site root wins: that page and its title describe the site, not one of its pages.
    const pathDepth = parsed.pathname.split('/').filter(Boolean).length
    if (pathDepth < site.pathDepth) {
      site.label = title
      site.url = url
      site.pathDepth = pathDepth
    }

    byOrigin.set(origin, site)
  }

  return [...byOrigin.values()]
    .sort((a, b) => b.visits - a.visits)
    .slice(0, TOP_SITES_LIMIT)
    .map(({ label, url }) => ({ label, url }))
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
