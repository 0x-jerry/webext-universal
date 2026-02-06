import { registerService } from '../shared/server'
import { createServices } from './services'

export function registerContentServices() {
  const services = createServices()

  return registerService('content', services)
}
