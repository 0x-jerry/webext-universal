<script lang='ts' setup>
import { useLocalStorage } from '@vueuse/core'
import { scanTopSites } from '../topSites'
import LinkSection, { type LinkItem } from './LinkSection.vue'

export interface TopSitesProps {
  filter?: string
  maxCount?: number
}

defineProps<TopSitesProps>()

const cache = useLocalStorage<LinkItem[]>('top-sites-cache', [])

async function load(): Promise<LinkItem[]> {
  // Stale-while-revalidate: render the cache at once, rescan in the background for the next open.
  const fresh = scanTopSites().then((items) => {
    cache.value = items
    return items
  })

  const cached = cache.value
  if (!cached.length) return fresh

  fresh.catch(() => {})
  return cached
}
</script>

<template>
  <LinkSection title="Top Sites" :filter="filter" :max-count="maxCount" :load="load" />
</template>
