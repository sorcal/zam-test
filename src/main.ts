import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'

const app = createApp(App)

initializeRouter(app)

app.use(VueQueryPlugin).mount('#app')
