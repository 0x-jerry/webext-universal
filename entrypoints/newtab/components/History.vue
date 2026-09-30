<script lang='ts' setup>
import LinkSection, { type LinkItem } from './LinkSection.vue'

export interface HistoryProps {
  filter?: string
  maxCount?: number
}

defineProps<HistoryProps>()

async function load(): Promise<LinkItem[]> {
  // title filtering happens in memory, so fetch more than maxCount
  const items = await browser.history.search({ text: '', maxResults: 1000, startTime: 0 })

  return items.map((n) => ({ label: n.title ?? '', url: n.url ?? '' }))
}
</script>

<template>
  <LinkSection title="History" :filter="filter" :max-count="maxCount" :load="load" />
</template>
