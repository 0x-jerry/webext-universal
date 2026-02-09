export function createServices() {
  const userAgentState = {
    rawUserAgent: navigator.userAgent,
    newUserAgent: '',
    defined: false,
  }

  return {
    setUserAgent(userAgent: string) {
      userAgentState.newUserAgent = userAgent

      if (userAgentState.defined) {
        return
      }

      userAgentState.defined = true
      Object.defineProperty(navigator, 'userAgent', {
        get() {
          return userAgentState.newUserAgent || userAgentState.rawUserAgent
        },
      })
    },
  }
}

export type MainWorldServices = ReturnType<typeof createServices>
