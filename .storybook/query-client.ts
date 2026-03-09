import type { App } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'

import { createQueryClient } from '@/ui/query-client'

const storybookQueryClient = createQueryClient()

export const installStorybookQueryClient = (app: App): void => {
  app.use(VueQueryPlugin, { queryClient: storybookQueryClient })
}

export const resetStorybookQueryClient = (): void => {
  storybookQueryClient.clear()
}
