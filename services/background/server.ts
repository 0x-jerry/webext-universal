import { createRPCServer, type Procedure } from '@0x-jerry/utils'
import { isCommunicationProtocol } from '../utils'
import { createBackgroundServices } from './services'

function registerService<T extends Procedure>(methods: T) {
  type SendResponse = (response: unknown) => void
  const senderMap = new Map<string, SendResponse>()

  return createRPCServer({
    adaptor: {
      receive(receiver) {
        browser.runtime.onMessage.addListener((data, sender, sendResponse) => {
          console.log('background server receive:', data, sender)

          if (isCommunicationProtocol(data)) {
            if (sender.tab?.id) {
              senderMap.set(data._, sendResponse)
            }

            receiver(data)
          }
        })
      },
      async send(data) {
        console.log('background server send:', data)

        const sendResponse = senderMap.get(data._)
        senderMap.delete(data._)

        if (sendResponse) {
          sendResponse(data)
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
