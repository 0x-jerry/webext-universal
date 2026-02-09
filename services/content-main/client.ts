import { createRPCClient } from '@0x-jerry/utils'
import type { MainWorldServices } from './services'

export function createContentMainServicesClient(script: HTMLScriptElement) {
  return createRPCClient<MainWorldServices>({
    namespace: 'content-main',
    adaptor: {
      registerReceiveCallback(receiveCallback) {
        script.addEventListener('rpc', (_evt) => {
          const evt = _evt as CustomEvent
          if (!evt.detail) {
            return
          }

          receiveCallback(evt.detail)
        })
      },
      send(data) {
        script.dispatchEvent(new CustomEvent('rpc', { detail: data }))
      },
    },
  })
}
