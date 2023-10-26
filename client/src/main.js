import App from './App.vue'
import router from './router' 

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { registerPlugins } from '@/plugins'

import VueTheMask from 'vue-the-mask'

import './assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTheMask)
registerPlugins(app)

app.mount('#app')
