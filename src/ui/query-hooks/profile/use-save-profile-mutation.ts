import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { SaveProfile } from '@/features/profile/actions'

import { profileKeys } from '@/ui/query-hooks/profile/keys'

export const useSaveProfileMutation = (saveProfile: SaveProfile) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveProfile,
    onSuccess: (res) => {
      if (res.ok) {
        void queryClient.invalidateQueries({ queryKey: profileKeys.view() })
      }
    },
  })
}
