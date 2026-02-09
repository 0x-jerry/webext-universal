import { registerContentMainServices } from '@/services'

export default defineUnlistedScript(() => {
  console.log('Hello from the main world')

  const script = document.currentScript
  registerContentMainServices(script as HTMLScriptElement)
})
