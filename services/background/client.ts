import { createRPCClient, type Procedure } from '@0x-jerry/utils'
import { isCommunicationProtocol } from '../utils'
import type { BackgroundServices } from './services'

function createClient<T extends Procedure>() {
  return createRPCClient<T>({
    adaptor: {
      receive(receiver) {
        browser.runtime.onMessage.addListener((data) => {
          console.log('background client receive:', data)

          if (isCommunicationProtocol(data)) {
            receiver(data)
          }
        })
      },
      async send(data) {
        console.log('background client send:', data)
        await browser.runtime.sendMessage(data)
      },
    },
  })
}

export function createBackgroundServicesClient() {
  return createClient<BackgroundServices>()
}
