import { registerService } from '../shared/server'
import { createServices } from './services'

export function registerPopupServices() {
  const services = createServices()

  return registerService('popup', services)
}
