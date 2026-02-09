import { createRPCClient } from '@0x-jerry/utils'
import type { MainWorldServices } from './services'

export function createContentMainServicesClient(script: HTMLScriptElement) {
  console.log(`[content-main] client registered`)

  return createRPCClient<MainWorldServices>({
    namespace: 'content-main',
    adaptor: {
      registerReceiveCallback(receiveCallback) {
        script.addEventListener('rpc', (_evt) => {
          const evt = _evt as CustomEvent
          if (!evt.detail) {
            return
          }

          if (receiveCallback(evt.detail)) {
            console.log('[content-main] client receive data:', evt.detail)
          }
        })
      },
      send(data) {
        console.log('[content-main] client send data:', data)
        script.dispatchEvent(new CustomEvent('rpc', { detail: data }))
      },
    },
  })
}
