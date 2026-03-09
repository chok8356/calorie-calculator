import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { SaveSummaryEntry } from '@/features/summary/actions'

import { summaryKeys } from '@/ui/query-hooks/summary/keys'

export const useSaveSummaryEntryMutation = (saveEntry: SaveSummaryEntry) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveEntry,
    onSuccess: (res) => {
      if (res.ok) {
        void queryClient.invalidateQueries({ queryKey: summaryKeys.list() })
      }
    },
  })
}
