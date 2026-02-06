import { registerBackgroundServices } from '@/services'

export default defineBackground(() => {
  registerBackgroundServices()
})
