import { getMainWorldServiceClient } from './main-world'

export function createServices() {
  return {
    userAgent: {
      change: (userAgent: string) => {
        getMainWorldServiceClient().setUserAgent(userAgent)
      },
    },
  }
}

export type ContentServices = ReturnType<typeof createServices>
