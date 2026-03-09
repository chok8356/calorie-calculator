import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { SaveFood } from '@/features/foods/actions'

import { foodsKeys } from '@/ui/query-hooks/foods/keys'

export const useSaveFoodMutation = (saveFood: SaveFood) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveFood,
    onSuccess: (res) => {
      if (res.ok) {
        void queryClient.invalidateQueries({ queryKey: foodsKeys.list() })
      }
    },
  })
}
