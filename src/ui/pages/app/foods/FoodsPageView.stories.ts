import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import type { Food } from '@/domain/foods/types'
import type { FoodsPageViewDeps } from '@/ui/pages/app/foods/FoodsPageView.vue'

import { useTestId } from '@/lib/use-test-id'
import { ok } from '@/shared/result'

import FoodsPageView from './FoodsPageView.vue'

const { getTestId } = useTestId('foods-page')

const demoFoods: Food[] = [
  {
    id: 'apple',
    name: 'Apple',
    per100g: { carbs: 14, fat: 0.2, kcal: 52, protein: 0.3 },
  },
  {
    id: 'banana',
    name: 'Banana',
    per100g: { carbs: 23, fat: 0.3, kcal: 89, protein: 1.1 },
  },
  {
    id: 'salmon',
    name: 'Salmon',
    per100g: { carbs: 0, fat: 13, kcal: 208, protein: 20 },
  },
]

const createDeps = (foods: Food[]): FoodsPageViewDeps => ({
  deleteFood: async (id: string) => {
    void id
    return ok(undefined)
  },
  saveFood: async (food: Food) => ok(food),
  viewFoodsList: async () => ok(foods),
})

const createLoadingDeps = (): FoodsPageViewDeps => ({
  deleteFood: async (id: string) => {
    void id
    return ok(undefined)
  },
  saveFood: async (food: Food) => ok(food),
  viewFoodsList: () => new Promise<never>(() => undefined),
})

const meta = {
  component: FoodsPageView,
  tags: ['autodocs'],
} satisfies Meta<typeof FoodsPageView>

export default meta

type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  args: {
    deps: createDeps(demoFoods),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('foods-list'))
    await expect(
      canvas.getByTestId(getTestId('total-items-value')),
    ).toHaveTextContent('3')
    await expect(
      canvas.getByTestId(getTestId('visible-items-value')),
    ).toHaveTextContent('3')
    await expect(canvas.getAllByTestId(getTestId('food-item'))).toHaveLength(3)
  },
}

export const SearchNoResults: Story = {
  args: {
    deps: createDeps(demoFoods),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('foods-list'))

    await userEvent.type(canvas.getByTestId(getTestId('search-input')), 'zzz')

    await canvas.findByTestId(getTestId('no-results-state'))
    await expect(
      canvas.getByTestId(getTestId('visible-items-value')),
    ).toHaveTextContent('0')

    await userEvent.click(canvas.getByTestId(getTestId('reset-search-button')))

    await waitFor(() => {
      expect(
        canvas.getByTestId(getTestId('visible-items-value')),
      ).toHaveTextContent('3')
    })
    await expect(canvas.getAllByTestId(getTestId('food-item'))).toHaveLength(3)
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
