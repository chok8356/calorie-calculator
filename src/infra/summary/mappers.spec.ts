import { describe, expect, it } from 'vitest'

import type { SummaryEntry } from '@/domain/summary/types'
import type { SummaryEntryDto } from '@/infra/summary-api-fake-factory'

import { domainToDto, dtoToDomain } from './mappers'

describe('summary mappers', () => {
  it('maps food dto to domain', () => {
    const dto: SummaryEntryDto = {
      created_at: '2026-02-27T08:00:00.000Z',
      entry_data: {
        _t: 'food',
        food_id: 'banana',
      },
      entry_id: 'entry-food',
      grams: 120,
    }

    expect(dtoToDomain(dto)).toEqual<SummaryEntry>({
      _t: 'food',
      createdAt: '2026-02-27T08:00:00.000Z',
      foodId: 'banana',
      grams: 120,
      id: 'entry-food',
    })
  })

  it('maps meal dto to domain', () => {
    const dto: SummaryEntryDto = {
      created_at: '2026-02-27T13:00:00.000Z',
      entry_data: {
        _t: 'meal',
        meal_id: 'meal-1',
      },
      entry_id: 'entry-meal',
      grams: 180,
    }

    expect(dtoToDomain(dto)).toEqual<SummaryEntry>({
      _t: 'meal',
      createdAt: '2026-02-27T13:00:00.000Z',
      grams: 180,
      id: 'entry-meal',
      mealId: 'meal-1',
    })
  })

  it('maps domain to dto for both entry kinds', () => {
    expect(
      domainToDto({
        _t: 'food',
        createdAt: '2026-02-27T08:00:00.000Z',
        foodId: 'banana',
        grams: 120,
        id: 'entry-food',
      }),
    ).toEqual<SummaryEntryDto>({
      created_at: '2026-02-27T08:00:00.000Z',
      entry_data: {
        _t: 'food',
        food_id: 'banana',
      },
      entry_id: 'entry-food',
      grams: 120,
    })

    expect(
      domainToDto({
        _t: 'meal',
        createdAt: '2026-02-27T13:00:00.000Z',
        grams: 180,
        id: 'entry-meal',
        mealId: 'meal-1',
      }),
    ).toEqual<SummaryEntryDto>({
      created_at: '2026-02-27T13:00:00.000Z',
      entry_data: {
        _t: 'meal',
        meal_id: 'meal-1',
      },
      entry_id: 'entry-meal',
      grams: 180,
    })
  })
})
