<script lang="ts" setup>
import type { GestureDir } from '@/services/modules/gesture'
import { execGestures } from './components/actions'
import GestureDetection from './components/GestureDetection.vue'
import { isMacOS } from './components/utils'
import { backgroundServiceClient } from './services'


async function detectedGesture(gesture: GestureDir[]) {
  if (await execGestures(gesture)) {
    return
  }

  await backgroundServiceClient.gesture.execGestures(gesture)
}

const isMac = isMacOS()
</script>

<template>
  <GestureDetection v-if="!isMac" @detected="detectedGesture" />
</template>

<style lang="less" scoped></style>
