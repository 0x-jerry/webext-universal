import { createClient } from '../shared/client'
import type { BackgroundServices } from './services'

export function createBackgroundServicesClient() {
  return createClient<BackgroundServices>('background')
}
