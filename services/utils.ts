import type { GestureAction, GestureDir } from './types'

export async function matchThenExecGestures(
  actions: GestureAction[],
  gesture: GestureDir[],
) {
  const action = actions.find((n) => isTheSameGesture(n.gesture, gesture))

  if (action) {
    console.info('Matched gesture action', action.name)

    try {
      await action?.action()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return false
}

function isTheSameGesture(g1: GestureDir[], g2: GestureDir[]) {
  if (g1.length !== g2.length) {
    return false
  }

  return g1.every((v, idx) => v === g2[idx])
}
