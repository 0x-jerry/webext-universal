import { createClient } from '../shared/client'
import type { ContentServices } from './services'

export function createContentServicesClient() {
  return createClient<ContentServices>('content')
}
