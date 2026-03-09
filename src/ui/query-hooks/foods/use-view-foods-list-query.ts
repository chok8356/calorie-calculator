import { useQuery } from '@tanstack/vue-query'

import type { ViewFoodsList } from '@/features/foods/actions'

import { foodsKeys } from '@/ui/query-hooks/foods/keys'

export const useViewFoodsListQuery = (listFoods: ViewFoodsList) =>
  useQuery({
    queryFn: listFoods,
    queryKey: foodsKeys.list(),
  })
