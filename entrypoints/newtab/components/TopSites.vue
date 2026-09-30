<script lang='ts' setup>
import LinkSection, { type LinkItem } from './LinkSection.vue'

export interface TopSitesProps {
  filter?: string
  maxCount?: number
}

defineProps<TopSitesProps>()

async function load(): Promise<LinkItem[]> {
  const items = await browser.topSites.get()

  return items.map((n) => ({ label: n.title ?? '', url: n.url ?? '' }))
}
</script>

<template>
  <LinkSection title="Top Sites" :filter="filter" :max-count="maxCount" :load="load" />
</template>
