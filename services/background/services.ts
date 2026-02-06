import { createGestureService } from '../modules/gesture'

export function createBackgroundServices() {
  return {
    gesture: createGestureService(),
  }
}

export type BackgroundServices = ReturnType<typeof createBackgroundServices>
