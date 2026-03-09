import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, within } from 'storybook/test'

import type { Food } from '@/domain/foods/types'
import type { Meal } from '@/domain/meals/types'
import type { ProfileSettings } from '@/domain/profile/types'
import type { SummaryEntry } from '@/domain/summary/types'
import type { SummaryPageViewDeps } from '@/ui/pages/app/summary/SummaryPageView.vue'

import { useTestId } from '@/lib/use-test-id'
import { ok } from '@/shared/result'

import SummaryPageView from './SummaryPageView.vue'

const { getTestId } = useTestId('summary-page')

const demoFoods: Food[] = [
  {
    id: 'banana',
    name: 'Banana',
    per100g: { carbs: 23, fat: 0.3, kcal: 89, protein: 1.1 },
  },
  {
    id: 'chicken',
    name: 'Chicken Breast',
    per100g: { carbs: 0, fat: 3.6, kcal: 165, protein: 31 },
  },
]

const demoMeals: Meal[] = [
  {
    id: 'chicken-plate',
    items: [{ foodId: 'chicken', grams: 180 }],
    name: 'Chicken Plate',
  },
]

const demoProfile: ProfileSettings = {
  customTargets: {
    carbs: 240,
    fat: 65,
    kcal: 2200,
    protein: 150,
  },
  mode: 'custom',
  recommended: {
    activity: 'moderate',
    age: 31,
    goal: 'maintain',
    heightCm: 176,
    sex: 'male',
    weightKg: 78,
  },
  updatedAt: '2026-02-27T08:00:00.000Z',
}

const demoEntries: SummaryEntry[] = [
  {
    _t: 'food',
    createdAt: '2026-02-27T08:10:00.000Z',
    foodId: 'banana',
    grams: 120,
    id: 'entry-banana',
  },
  {
    _t: 'meal',
    createdAt: '2026-02-27T13:00:00.000Z',
    grams: 180,
    id: 'entry-chicken-plate',
    mealId: 'chicken-plate',
  },
]

const createDeps = (entries: SummaryEntry[]): SummaryPageViewDeps => ({
  deleteSummaryEntry: async (id: string) => {
    void id
    return ok(undefined)
  },
  saveSummaryEntry: async (entry: SummaryEntry) => ok(entry),
  viewFoodsList: async () => ok(demoFoods),
  viewMealsList: async () => ok(demoMeals),
  viewProfile: async () => ok(demoProfile),
  viewSummaryList: async () => ok(entries),
})

const createLoadingDeps = (): SummaryPageViewDeps => ({
  deleteSummaryEntry: async (id: string) => {
    void id
    return ok(undefined)
  },
  saveSummaryEntry: async (entry: SummaryEntry) => ok(entry),
  viewFoodsList: async () => ok(demoFoods),
  viewMealsList: async () => ok(demoMeals),
  viewProfile: async () => ok(demoProfile),
  viewSummaryList: () => new Promise<never>(() => undefined),
})

const meta = {
  component: SummaryPageView,
  tags: ['autodocs'],
} satisfies Meta<typeof SummaryPageView>

export default meta

type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  args: {
    deps: createDeps(demoEntries),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('entries-list'))
    await expect(
      canvas.getByTestId(getTestId('total-kcal-value')),
    ).toHaveTextContent('403.8')
    await expect(canvas.getAllByTestId(getTestId('entry-item'))).toHaveLength(2)
    await expect(
      canvas.getByTestId(getTestId('targets-card')),
    ).toBeInTheDocument()
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
