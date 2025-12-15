<script setup lang="ts">
import { useAsyncState, useResizeObserver } from '@vueuse/core';
import { browser } from 'wxt/browser'
import Dropdown from './components/Dropdown.vue';
import RecentClosed from './components/RecentClosed.vue';
import TopSites from './components/TopSites.vue';

const filter = ref('')

const bookmarksData = useAsyncState(() => browser.bookmarks.getTree(), [])
bookmarksData.execute()

const bookmarksBar = computed(() => bookmarksData.state.value[0]?.children?.find(n => n.folderType === 'bookmarks-bar'))
const bookmarksOther = computed(() => bookmarksData.state.value[0]?.children?.find(n => n.folderType === 'other'))

const bookmarksEl = useTemplateRef('bookmarksEl')
const hasScrollbar = ref(false)

useResizeObserver(bookmarksEl, () => {
  const el = bookmarksEl.value
  if (!el) return
  hasScrollbar.value = el.scrollWidth > el.clientWidth
})
</script>

<template>
  <div class="shadow-lg flex fixed top-0 left-0 w-full z-10 bg-white">
    <div class="flex overflow-auto flex-1 w-0" ref="bookmarksEl">
      <template v-for="item in bookmarksBar?.children">
        <Dropdown :title="item.title" :url="item.url" :menus="item.children" />
      </template>
    </div>
    <div v-if="bookmarksOther?.children?.length" :class="{ 'split-border': hasScrollbar }">
      <Dropdown :title="bookmarksOther.title" :menus="bookmarksOther.children" />
    </div>
  </div>

  <div class="mt-100px">
    <div class="content w-60vw max-w-700px m-auto">
      <div class="w-full px-4 py-2 border-(1 solid gray-3) rounded-full text-lg mb-4">
        <input class="search-input w-full border-none appearance-none outline-none" v-model="filter" type="text"
          placeholder="Search ...">
      </div>

      <TopSites :filter="filter" :max-count="10" />
      <RecentClosed :filter="filter" :max-count="20" />
    </div>
  </div>
</template>

<style lang="less">
.split-border {
  --uno: border-(0 l solid gray-2);
}

.search-input {
  line-height: 1.5em;
}
</style>
