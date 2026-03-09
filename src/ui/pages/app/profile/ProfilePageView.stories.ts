import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import type { ProfileSettings } from '@/domain/profile/types'
import type { ProfilePageViewDeps } from '@/ui/pages/app/profile/ProfilePageView.vue'

import { useTestId } from '@/lib/use-test-id'
import { err, ok } from '@/shared/result'

import ProfilePageView from './ProfilePageView.vue'

const { getTestId } = useTestId('profile-page')

const recommendedProfile: ProfileSettings = {
  customTargets: {
    carbs: 220,
    fat: 70,
    kcal: 2100,
    protein: 140,
  },
  mode: 'recommended',
  recommended: {
    activity: 'moderate',
    age: 30,
    goal: 'maintain',
    heightCm: 170,
    sex: 'female',
    weightKg: 70,
  },
  updatedAt: '2026-02-27T09:30:00.000Z',
}

const customProfile: ProfileSettings = {
  ...recommendedProfile,
  mode: 'custom',
}

const createDeps = (profile: null | ProfileSettings): ProfilePageViewDeps => ({
  saveProfile: async (next: ProfileSettings) => ok(next),
  viewProfile: async () => ok(profile),
})

const createInfraErrorDeps = (
  profile: null | ProfileSettings,
): ProfilePageViewDeps => ({
  saveProfile: async () => err({ _t: 'infra' }),
  viewProfile: async () => ok(profile),
})

const meta = {
  component: ProfilePageView,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfilePageView>

export default meta

type Story = StoryObj<typeof meta>

export const RecommendedActive: Story = {
  args: {
    deps: createDeps(recommendedProfile),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('recommended-section'))
    await expect(
      canvas.getByTestId(getTestId('recommended-active-goal')),
    ).toBeInTheDocument()
    await expect(
      canvas.getByTestId(getTestId('summary-impact')),
    ).toBeInTheDocument()
  },
}

export const CustomActive: Story = {
  args: {
    deps: createDeps(customProfile),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('custom-section'))
    await expect(
      canvas.getByTestId(getTestId('custom-active-goal')),
    ).toBeInTheDocument()
  },
}

export const RecommendedSaveError: Story = {
  args: {
    deps: createInfraErrorDeps(recommendedProfile),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await canvas.findByTestId(getTestId('recommended-section'))
    await userEvent.click(
      canvas.getByTestId(getTestId('use-recommended-button')),
    )
    await expect(
      canvas.getByTestId(getTestId('recommended-error')),
    ).toHaveTextContent('Something went wrong. Please try again.')
  },
}
