import { createRPCClient, type Procedure } from '@0x-jerry/utils'
import { isCommunicationProtocol } from '../utils'

export function createClient<T extends Procedure>(name: string) {
  return createRPCClient<T>({
    adaptor: {
      receive(receiver) {
        browser.runtime.onMessage.addListener((data) => {
          console.log(`[${name}] client receive:`, data)

          if (isCommunicationProtocol(data)) {
            receiver(data)
          }
        })
      },
      async send(data) {
        console.log(`[${name}] client send:`, data)
        await browser.runtime.sendMessage(data)
      },
    },
  })
}
