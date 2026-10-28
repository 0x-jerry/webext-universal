<script lang='ts' setup>
import { useAsyncState } from '@vueuse/core'
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

const { state: items } = useAsyncState(load, [])
</script>

<template>
  <LinkSection title="Recently Closed" :links="items" :filter="filter" :max-count="maxCount" />
</template>
