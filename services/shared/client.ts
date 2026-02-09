import { createRPCClient, type Procedure } from '@0x-jerry/utils'

export function createClient<T extends Procedure>(name: string) {
  console.log(`[${name}] client registered`)

  return createRPCClient<T>({
    namespace: name,
    adaptor: {
      registerReceiveCallback(receiveCallback) {
        browser.runtime.onMessage.addListener((data) => {
          if (!receiveCallback(data)) {
            return
          }

          console.log(`[${name}] client receive:`, data)
        })
      },
      async send(data) {
        await nextTick()
        console.log(`[${name}] client send:`, data)

        if (browser.tabs) {
          const tabs = await browser.tabs.query({
            active: true,
            currentWindow: true,
          })
          const activeTab = tabs.at(0)

          if (activeTab?.id) {
            await chrome.tabs.sendMessage(activeTab.id, data)
          }
        }

        await browser.runtime.sendMessage(data)
      },
    },
  })
}
