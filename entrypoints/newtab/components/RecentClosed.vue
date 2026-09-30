<script lang='ts' setup>
import LinkSection, { type LinkItem } from './LinkSection.vue'

export interface RecentClosedProps {
  filter?: string
  maxCount?: number
}

defineProps<RecentClosedProps>()

async function load(): Promise<LinkItem[]> {
  const items = await browser.sessions.getRecentlyClosed()

  return items.map((n) => ({ label: n.tab?.title ?? '', url: n.tab?.url ?? '' }))
}
</script>

<template>
  <LinkSection title="Recently Closed" :filter="filter" :max-count="maxCount" :load="load" />
</template>
