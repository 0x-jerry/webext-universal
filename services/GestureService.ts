import { defineProxyService } from '@webext-core/proxy-service'
import { type GestureAction, GestureDir } from './types'
import { matchThenExecGestures } from './utils'

const backgroundActions: GestureAction[] = [
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
