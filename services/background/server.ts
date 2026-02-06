import { createRPCServer, type Procedure } from '@0x-jerry/utils'
import { isCommunicationProtocol } from '../utils'
import { createBackgroundServices } from './services'

function registerService<T extends Procedure>(methods: T) {
  const senderMap = new Map<string, Browser.runtime.MessageSender>()

  return createRPCServer({
    adaptor: {
      receive(receiver) {
        browser.runtime.onMessage.addListener((data, sender) => {
          console.log('background server receive:', data)

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

        console.log('background server send:', data)

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
}

export function registerBackgroundServices() {
  const backgroundServices = createBackgroundServices()

  registerService(backgroundServices)
  console.log('Background services registered')
}
