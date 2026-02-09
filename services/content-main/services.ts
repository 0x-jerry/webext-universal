export const mainWorldServices = {
  setUserAgent(userAgent: string) {
    Object.defineProperty(navigator, 'userAgent', { value: userAgent })
  },
}

export type MainWorldServices = typeof mainWorldServices
