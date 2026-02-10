import { useLocalStorage } from "@vueuse/core"
import { EXT_NAME } from "@/utils"

export function createServices() {
  const userAgentState = {
    rawUserAgent: navigator.userAgent,
    newUserAgent: useLocalStorage(`${EXT_NAME}:newUserAgent`, ''),
  }

  Object.defineProperty(navigator, 'userAgent', {
    get() {
      return userAgentState.newUserAgent.value || userAgentState.rawUserAgent
    },
  })

  return {
    setUserAgent(userAgent: string) {
      userAgentState.newUserAgent.value = userAgent
    },
    getUserAgent() {
      return userAgentState.newUserAgent.value || userAgentState.rawUserAgent
    }
  }
}

export type MainWorldServices = ReturnType<typeof createServices>
