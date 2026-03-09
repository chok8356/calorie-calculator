export const foodsKeys = {
  all: ['foods'] as const,
  list: () => [...foodsKeys.all, 'list'] as const,
}
