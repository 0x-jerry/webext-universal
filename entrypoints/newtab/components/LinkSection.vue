<script lang='ts' setup>
import { matchString } from '../utils'
import Link from './Link.vue'
import NoData from './NoData.vue'
import Section from './Section.vue'

export interface LinkItem {
  label: string
  url: string
}

export interface LinkSectionProps {
  title: string
  links: readonly LinkItem[]
  filter?: string
  maxCount?: number
}

const props = defineProps<LinkSectionProps>()

const result = computed(() => {
  const value = props.filter
  const links = props.links.filter((n) => !!(n.label && n.url))
  const filtered = value ? links.filter((n) => matchString(n.label, value) || matchString(n.url, value)) : links

  return filtered.slice(0, props.maxCount)
})
</script>

<template>
  <Section :title="title">
    <template v-if='result.length'>
      <template v-for='item in result' :key='item.url'>
        <Link :label='item.label' :url='item.url' />
      </template>
    </template>
    <template v-else>
      <NoData />
    </template>
  </Section>

</template>
