import { createClient } from '../shared/client'
import type { PopupServices } from './services'

export function createPopupServicesClient() {
  return createClient<PopupServices>('popup')
}
