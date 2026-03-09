import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { SaveMeal } from '@/features/meals/actions'

import { mealsKeys } from '@/ui/query-hooks/meals/keys'

export const useSaveMealMutation = (saveMeal: SaveMeal) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveMeal,
    onSuccess: (res) => {
      if (res.ok) {
        void queryClient.invalidateQueries({ queryKey: mealsKeys.list() })
      }
    },
  })
}
