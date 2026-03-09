import { QueryClient } from '@tanstack/vue-query'

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 1000 * 60 * 5,
      },
    },
  })
