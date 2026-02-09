import { createContentMainServicesClient } from '../content-main'

let contentMainServiceClient: ReturnType<typeof createContentMainServicesClient>
export const getMainWorldServiceClient = () => {
  return contentMainServiceClient
}

export function initializeMainWordServicesClient(script: HTMLScriptElement) {
  contentMainServiceClient = createContentMainServicesClient(script)
}
