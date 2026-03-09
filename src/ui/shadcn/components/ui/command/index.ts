import type { Ref } from 'vue'

import { createContext } from 'reka-ui'

export { default as Command } from './Command.vue'
export { default as CommandDialog } from './CommandDialog.vue'
export { default as CommandEmpty } from './CommandEmpty.vue'
export { default as CommandGroup } from './CommandGroup.vue'
export { default as CommandInput } from './CommandInput.vue'
export { default as CommandItem } from './CommandItem.vue'
export { default as CommandList } from './CommandList.vue'
export { default as CommandSeparator } from './CommandSeparator.vue'
export { default as CommandShortcut } from './CommandShortcut.vue'

export const [useCommand, provideCommandContext] = createContext<{
  allGroups: Ref<Map<string, Set<string>>>
  allItems: Ref<Map<string, string>>
  filterState: {
    filtered: { count: number; groups: Set<string>; items: Map<string, number> }
    search: string
  }
}>('Command')

export const [useCommandGroup, provideCommandGroupContext] = createContext<{
  id?: string
}>('CommandGroup')
