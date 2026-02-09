import { createRPCServer, type Procedure } from '@0x-jerry/utils'

export function registerService<T extends Procedure>(name: string, methods: T) {
  console.log(`[${name}] service registered`)
  const senderMap = new Map<string, Browser.runtime.MessageSender>()

  const server = createRPCServer({
    namespace: name,
    adaptor: {
      registerReceiveCallback(receiveCallback) {
        browser.runtime.onMessage.addListener((data, sender) => {
          if (!receiveCallback(data)) {
            return
          }

          console.log(`[${name}] server receive:`, data)

          if (sender.tab?.id) {
            senderMap.set(data._, sender)
          }
        })
      },
      async send(data) {
        await nextTick()
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

  return server
}
