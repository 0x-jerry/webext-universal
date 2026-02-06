import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './style.css'
import 'uno.css'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)

app.use(TDesign)

app.mount('#app')
