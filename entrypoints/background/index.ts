import { registerGestureService } from '@/services/GestureService'

export default defineBackground(() => {
  registerGestureService()
})
