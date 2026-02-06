import { registerService } from '../shared/server'
import { createBackgroundServices } from './services'

export function registerBackgroundServices() {
  const backgroundServices = createBackgroundServices()

  return registerService('background', backgroundServices)
}
