import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { DeleteSummaryEntry } from '@/features/summary/actions'

import { summaryKeys } from '@/ui/query-hooks/summary/keys'

export const useDeleteSummaryEntryMutation = (
  deleteEntry: DeleteSummaryEntry,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEntry,
    onSuccess: (res) => {
      if (res.ok) {
        void queryClient.invalidateQueries({ queryKey: summaryKeys.list() })
      }
    },
  })
}
