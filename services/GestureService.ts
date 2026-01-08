import { defineProxyService } from '@webext-core/proxy-service'
import { type GestureAction, GestureDir } from './types'
import { matchThenExecGestures } from './utils'

const backgroundActions: GestureAction[] = [
  {
    name: 'Close Tab',
    gesture: [GestureDir.Down, GestureDir.Right],
    async action() {
      const tabs = await browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
      })

      const tab = tabs.at(0)

      if (!tab?.id) {
        return
      }

      await browser.tabs.remove(tab.id)
    },
  },
  {
    name: 'Restore Tab',
    gesture: [GestureDir.Left, GestureDir.Up],
    async action() {
      await browser.sessions.restore()
    },
  },
]

class GestureService {
  async execGestures(gesture: GestureDir[]) {
    return matchThenExecGestures(backgroundActions, gesture)
  }
}

export const [registerGestureService, getGestureService] = defineProxyService(
  'GestureService',
  () => new GestureService(),
)
