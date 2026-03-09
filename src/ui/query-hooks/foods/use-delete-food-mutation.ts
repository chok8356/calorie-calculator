import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { DeleteFood } from '@/features/foods/actions'

import { foodsKeys } from '@/ui/query-hooks/foods/keys'

export const useDeleteFoodMutation = (deleteFood: DeleteFood) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFood,
    onSuccess: (res) => {
      if (res.ok) {
        void queryClient.invalidateQueries({ queryKey: foodsKeys.list() })
      }
    },
  })
}
