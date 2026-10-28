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
const items = shallowRef(cache.value)

async function refresh() {
  try {
    const sites = await scanTopSites()
    cache.value = sites
    items.value = sites
  } catch (err) {
    console.warn('scan top sites failed:', err)
  }
}

refresh()
</script>

<template>
  <LinkSection title="Top Sites" :links="items" :filter="filter" :max-count="maxCount" />
</template>
