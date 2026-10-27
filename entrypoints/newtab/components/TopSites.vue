<script lang='ts' setup>
import { scanTopSites } from '../topSites'
import LinkSection, { type LinkItem } from './LinkSection.vue'

export interface TopSitesProps {
  filter?: string
  maxCount?: number
}

defineProps<TopSitesProps>()

function load(): Promise<LinkItem[]> {
  return scanTopSites()
}
</script>

<template>
  <LinkSection title="Top Sites" :filter="filter" :max-count="maxCount" :load="load" />
</template>
