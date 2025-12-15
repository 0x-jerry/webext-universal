<script lang="ts" setup>
import { getGestureService } from '@/services/GestureService'
import type { GestureDir } from '@/services/types'
import { execGestures } from './components/actions'
import GestureDetection from './components/GestureDetection.vue'
import { isMacOS } from './components/utils'

const gestureService = getGestureService()

async function detectedGesture(gesture: GestureDir[]) {
  if (await execGestures(gesture)) {
    return
  }

  await gestureService.execGestures(gesture)
}

const isMac = isMacOS()
</script>

<template>
  <GestureDetection v-if="!isMac" @detected="detectedGesture" />
</template>

<style lang="less" scoped></style>
