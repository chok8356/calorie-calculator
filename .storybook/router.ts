import type { App } from 'vue'

import { createMemoryHistory } from 'vue-router'

import { createAppRouter } from '@/ui/router/create-app-router'
import { ROUTES } from '@/ui/router/routes'

export const storybookRouter = createAppRouter(createMemoryHistory())

export const installStorybookRouter = (app: App): void => {
  app.use(storybookRouter)
}

export const resetStorybookRouter = async (): Promise<void> => {
  await storybookRouter.replace(ROUTES.SUMMARY)
}
