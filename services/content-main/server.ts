import { createRPCServer } from '@0x-jerry/utils'
import { createServices } from './services'

export function registerContentMainServices(script: HTMLScriptElement) {
  console.log(`[content-main] server registered`)
  createRPCServer({
    namespace: 'content-main',
    methods: createServices(),
    adaptor: {
      registerReceiveCallback(receiveCallback) {
        script.addEventListener('rpc', (_evt) => {
          const evt = _evt as CustomEvent
          if (!evt.detail) {
            return
          }

          if (receiveCallback(evt.detail)) {
            console.log('[content-main] server receive data:', evt.detail)
          }
        })
      },
      send(data) {
        console.log('[content-main] server send data:', data)
        script.dispatchEvent(new CustomEvent('rpc', { detail: data }))
      },
    },
  })
}
