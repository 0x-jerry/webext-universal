<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { reactive } from 'vue'
import type { GestureDir, GesturePosition } from '@/services/types'
import { calcDirection, calcPath, dirCharMap, distance } from './utils'

export interface GestureDetectionProps {
  /**
   * @default 10
   */
  checkGap?: number
}

const { checkGap = 10 } = defineProps<GestureDetectionProps>()

const emit = defineEmits<{
  detected: [gesture: GestureDir[]]
}>()

const gestureState = reactive({
  preventCtxMenu: false,
  processing: false,
  dirs: [] as GestureDir[],
  tracker: [] as GesturePosition[],
  clearHandler: -1,
  clearTimeout: 100,
})

const trackerPath = computed(() => calcPath(gestureState.tracker))

useEventListener(
  window,
  'contextmenu',
  (evt) => {
    if (gestureState.preventCtxMenu) {
      evt.preventDefault()
    }
  },
  {
    capture: true,
  },
)

useEventListener(
  window,
  'mousedown',
  (evt) => {
    if (evt.button !== 2) {
      return
    }

    if (gestureState.preventCtxMenu) {
      gestureState.processing = false
      gestureState.preventCtxMenu = false
      clearPath()
      clearTimeout(gestureState.clearHandler)
      return
    }

    gestureState.preventCtxMenu = true
    gestureState.processing = true
    evt.preventDefault()
  },
  {
    capture: true,
  },
)

useEventListener(
  window,
  'mouseup',
  () => {
    if (!gestureState.processing) {
      return
    }

    clearTimeout(gestureState.clearHandler)

    if (!gestureState.dirs.length) {
      gestureState.preventCtxMenu = false
      gestureState.processing = false
      clearPath()
      return
    }

    emit('detected', gestureState.dirs)
    gestureState.processing = false
    clearPath()

    gestureState.clearHandler = window.setTimeout(() => {
      gestureState.preventCtxMenu = false
    }, gestureState.clearTimeout)
  },
  { capture: true },
)

useEventListener(
  window,
  'mousemove',
  (evt) => {
    if (!gestureState.processing) {
      return
    }

    const currentPos = { x: evt.clientX, y: evt.clientY }

    const latestPos = gestureState.tracker[gestureState.tracker.length - 1]

    if (!latestPos) {
      gestureState.tracker.push(currentPos)
      return
    }

    const _distance = distance(latestPos, currentPos)

    if (_distance < checkGap) {
      return
    }

    const _dir = calcDirection(latestPos, currentPos)

    if (gestureState.dirs.at(-1) !== _dir) {
      gestureState.dirs.push(_dir)
    }

    gestureState.tracker.push(currentPos)
  },
  {
    capture: true,
  },
)

function clearPath() {
  gestureState.dirs = []
  gestureState.tracker = []
}
</script>

<template>
  <div class="tracker">
    <svg style="width: 100%; height: 100%" v-if="trackerPath">
      <path :d="trackerPath" stroke="#0398fc" stroke-width="2" fill="none" />
    </svg>

    <div class="gesture-directions" v-if="gestureState.dirs.length">
      <div class="gesture-direction" v-for="g in gestureState.dirs">
        {{ dirCharMap[g] }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tracker {
  position: fixed;
  z-index: 999999;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gesture-directions {
  position: fixed;
  width: 100vw;
  bottom: 20vh;
  padding: 10px 40px;
  background: rgba(197, 197, 197, 0.295);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;

  color: black;
  font-family: monospace;

  font-weight: bold;
}

.gesture-direction {
  --size: 30px;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(143, 143, 143, 0.322);
  border-radius: 4px;
}
</style>
