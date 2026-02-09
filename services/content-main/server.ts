import { createRPCServer } from '@0x-jerry/utils'
import { mainWorldServices } from './services'

export function registerContentMainServices(script: HTMLScriptElement) {
  createRPCServer({
    namespace: 'content-main',
    methods: mainWorldServices,
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
