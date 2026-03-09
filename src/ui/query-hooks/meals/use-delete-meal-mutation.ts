import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { DeleteMeal } from '@/features/meals/actions'

import { mealsKeys } from '@/ui/query-hooks/meals/keys'

export const useDeleteMealMutation = (deleteMeal: DeleteMeal) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMeal,
    onSuccess: (res) => {
      if (res.ok) {
        void queryClient.invalidateQueries({ queryKey: mealsKeys.list() })
      }
    },
  })
}
