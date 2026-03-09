import { useQuery } from '@tanstack/vue-query'

import type { ViewSummaryList } from '@/features/summary/actions'

import { summaryKeys } from '@/ui/query-hooks/summary/keys'

export const useViewSummaryListQuery = (viewSummaryList: ViewSummaryList) =>
  useQuery({
    queryFn: () => viewSummaryList(),
    queryKey: summaryKeys.list(),
  })
