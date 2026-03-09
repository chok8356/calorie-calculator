import type { Router, RouterHistory } from 'vue-router'

import { createRouter } from 'vue-router'

import { appRoutes } from '@/ui/router/app-routes'

export const createAppRouter = (history: RouterHistory): Router =>
  createRouter({
    history,
    routes: appRoutes,
  })
