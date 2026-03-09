export const mealsKeys = {
  all: ['meals'] as const,
  list: () => [...mealsKeys.all, 'list'] as const,
}
