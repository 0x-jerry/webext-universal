<script lang='ts' setup>
import { useAsyncState } from '@vueuse/core'
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
  filter?: string
  maxCount?: number
  load: () => Promise<LinkItem[]>
}

const props = defineProps<LinkSectionProps>()

const data = useAsyncState(async () => {
  const items = await props.load()

  return items.filter((n) => !!(n.label && n.url))
}, [])

data.execute()

const result = computed(() => {
  const value = props.filter
  const items = value ? data.state.value.filter((n) => matchString(n.label, value) || matchString(n.url, value)) : data.state.value

  return items.slice(0, props.maxCount)
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
