import { useQuery } from '@tanstack/vue-query'

import type { ViewProfile } from '@/features/profile/actions'

import { profileKeys } from '@/ui/query-hooks/profile/keys'

export const useViewProfileQuery = (viewProfile: ViewProfile) =>
  useQuery({
    queryFn: () => viewProfile(),
    queryKey: profileKeys.view(),
  })
