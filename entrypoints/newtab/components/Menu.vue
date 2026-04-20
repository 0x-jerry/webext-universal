<script lang='ts' setup>
import Link from './Link.vue'
import Menu from './Menu.vue'
import Popup from './Popup.vue'

export interface MenuProps {
  children?: MenuProps[]
  title: string
  url?: string
}

const props = defineProps<MenuProps>()

const isFolder = computed(() => !props.url)
</script>

<template>
  <div class="menu w-full">
    <template v-if="isFolder">
      <Popup placement="right-start">
        <template #reference="{ active }">
          <Link :label="title" :active="active" />
        </template>
        <div class="bg-white max-h-85vh overflow-y-auto shadow-lg w-400px border-(0 t solid gray-2)">
          <Menu v-for="(menu, index) in props.children" :key="index" v-bind="menu" />
        </div>
      </Popup>
    </template>
    <template v-else>
      <Link :label="title" :url="url!" />
    </template>
  </div>

</template>

<style lang='less'></style>