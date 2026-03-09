import { createWebHashHistory } from 'vue-router'

import { createAppRouter } from '@/ui/router/create-app-router'

export const router = createAppRouter(
  createWebHashHistory(import.meta.env.BASE_URL),
)
