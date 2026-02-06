import {
  createBackgroundServicesClient,
  createContentServicesClient,
} from '@/services'

export const backgroundServiceClient = createBackgroundServicesClient()
export const contentServiceClient = createContentServicesClient()
