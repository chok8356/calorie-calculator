import { useQuery } from '@tanstack/vue-query'

import type { ViewMealsList } from '@/features/meals/actions'

import { mealsKeys } from '@/ui/query-hooks/meals/keys'

export const useViewMealsListQuery = (listMeals: ViewMealsList) =>
  useQuery({
    queryFn: listMeals,
    queryKey: mealsKeys.list(),
  })
