import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'
import type { MealsPageViewDeps } from '@/ui/pages/app/meals/MealsPageView.vue'

import { useTestId } from '@/lib/use-test-id'
import { ok } from '@/shared/result'

import MealsPageView from './MealsPageView.vue'

const { getTestId } = useTestId('meals-page')

const demoFoods: Food[] = [
  {
    id: 'egg',
    name: 'Egg',
    per100g: { carbs: 1.1, fat: 11, kcal: 155, protein: 13 },
  },
  {
    id: 'oats',
    name: 'Oats',
    per100g: { carbs: 66, fat: 6.9, kcal: 389, protein: 17 },
  },
  {
    id: 'yogurt',
    name: 'Yogurt',
    per100g: { carbs: 4.7, fat: 3.3, kcal: 61, protein: 3.5 },
  },
]

const demoMeals: Meal[] = [
  {
    id: 'oatmeal-bowl',
    items: [
      { foodId: 'oats', grams: 80 },
      { foodId: 'yogurt', grams: 120 },
    ],
    name: 'Oatmeal Bowl',
  },
  {
    id: 'egg-breakfast',
    items: [{ foodId: 'egg', grams: 150 }],
    name: 'Egg Breakfast',
  },
]

const createDeps = (meals: Meal[]): MealsPageViewDeps => ({
  deleteMeal: async (id: string) => {
    void id
    return ok(undefined)
  },
  saveMeal: async (meal: Meal) => ok(meal),
  viewFoodsList: async () => ok(demoFoods),
  viewMealsList: async () => ok(meals),
})

const createLoadingDeps = (): MealsPageViewDeps => ({
  deleteMeal: async (id: string) => {
    void id
    return ok(undefined)
  },
  saveMeal: async (meal: Meal) => ok(meal),
  viewFoodsList: async () => ok(demoFoods),
  viewMealsList: () => new Promise<never>(() => undefined),
})

const meta = {
  component: MealsPageView,
  tags: ['autodocs'],
} satisfies Meta<typeof MealsPageView>

export default meta

type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  args: {
    deps: createDeps(demoMeals),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('meals-list'))
    await expect(
      canvas.getByTestId(getTestId('total-items-value')),
    ).toHaveTextContent('2')
    await expect(
      canvas.getByTestId(getTestId('visible-items-value')),
    ).toHaveTextContent('2')
    await expect(canvas.getAllByTestId(getTestId('meal-item'))).toHaveLength(2)
  },
}

export const SearchNoResults: Story = {
  args: {
    deps: createDeps(demoMeals),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('meals-list'))
    await userEvent.type(canvas.getByTestId(getTestId('search-input')), 'zzz')
    await canvas.findByTestId(getTestId('no-results-state'))
    await expect(
      canvas.getByTestId(getTestId('visible-items-value')),
    ).toHaveTextContent('0')
    await userEvent.click(canvas.getByTestId(getTestId('reset-search-button')))
    await waitFor(() => {
      expect(
        canvas.getByTestId(getTestId('visible-items-value')),
      ).toHaveTextContent('2')
    })
    await expect(canvas.getAllByTestId(getTestId('meal-item'))).toHaveLength(2)
  },
}

export const Empty: Story = {
  args: {
    deps: createDeps([]),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('empty-state'))
    await expect(
      canvas.getByTestId(getTestId('empty-state')),
    ).toBeInTheDocument()
  },
}

export const Loading: Story = {
  args: {
    deps: createLoadingDeps(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('loading-state'))
    await expect(
      canvas.getByTestId(getTestId('loading-state')),
    ).toBeInTheDocument()
  },
}
