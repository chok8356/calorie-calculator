import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import './app.css'
import { seedLocalStorage } from '@/infra/seed'
import { createQueryClient } from '@/ui/query-client'
import { router } from '@/ui/router/router'

import App from './App.vue'

const app = createApp(App)
const queryClient = createQueryClient()

seedLocalStorage(window.localStorage)

app.use(VueQueryPlugin, { queryClient })
app.use(router)

app.mount('#app')
