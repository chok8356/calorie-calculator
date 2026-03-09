import type { SummaryEntry } from '@/domain/summary/types'
import type { SummaryEntryDto } from '@/infra/summary-api-fake-factory'

export const dtoToDomain = (dto: SummaryEntryDto): SummaryEntry => {
  if (dto.entry_data._t === 'food') {
    return {
      _t: 'food',
      createdAt: dto.created_at,
      foodId: dto.entry_data.food_id,
      grams: dto.grams,
      id: dto.entry_id,
    }
  }

  return {
    _t: 'meal',
    createdAt: dto.created_at,
    grams: dto.grams,
    id: dto.entry_id,
    mealId: dto.entry_data.meal_id,
  }
}

export const domainToDto = (entry: SummaryEntry): SummaryEntryDto => {
  if (entry._t === 'food') {
    return {
      created_at: entry.createdAt,
      entry_data: {
        _t: 'food',
        food_id: entry.foodId,
      },
      entry_id: entry.id,
      grams: entry.grams,
    }
  }

  return {
    created_at: entry.createdAt,
    entry_data: {
      _t: 'meal',
      meal_id: entry.mealId,
    },
    entry_id: entry.id,
    grams: entry.grams,
  }
}
