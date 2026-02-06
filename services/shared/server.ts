import { createRPCServer, type Procedure } from '@0x-jerry/utils'
import { isCommunicationProtocol } from '../utils'

export function registerService<T extends Procedure>(name: string, methods: T) {
  const senderMap = new Map<string, Browser.runtime.MessageSender>()

  const server = createRPCServer({
    adaptor: {
      receive(receiver) {
        browser.runtime.onMessage.addListener((data, sender) => {
          console.log(`[${name}] server receive:`, data)

          if (isCommunicationProtocol(data)) {
            if (sender.tab?.id) {
              senderMap.set(data._, sender)
            }

            receiver(data)
          }
        })
      },
      async send(data) {
        const sender = senderMap.get(data._)
        senderMap.delete(data._)

        console.log(`[${name}] server send:`, data)

        if (sender?.tab?.id) {
          chrome.tabs.sendMessage(sender.tab.id, data, {
            documentId: sender.documentId,
            frameId: sender.frameId,
          })
        } else {
          chrome.runtime.sendMessage(data)
        }
      },
    },
    methods,
  })

  console.log(`${name} services registered`)
  return server
}
