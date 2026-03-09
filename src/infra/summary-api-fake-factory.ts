export type SummaryEntryDto = {
  created_at: string
  entry_data:
    | {
        _t: 'food'
        food_id: string
      }
    | {
        _t: 'meal'
        meal_id: string
      }
  entry_id: string
  grams: number
}

type DeleteSummaryEntryResult = { _t: 'deleted' } | { _t: 'not-found' }

const STORAGE_KEY = 'summary.v1'

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const readRaw = (storage: Storage): unknown => {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as unknown
  } catch {
    return []
  }
}

const isSummaryEntryDto = (value: unknown): value is SummaryEntryDto => {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<SummaryEntryDto>
  if (
    typeof v.entry_id !== 'string' ||
    typeof v.created_at !== 'string' ||
    typeof v.grams !== 'number'
  ) {
    return false
  }
  if (!v.entry_data || typeof v.entry_data !== 'object') return false
  const entryData = v.entry_data as SummaryEntryDto['entry_data']
  if (entryData._t === 'food') {
    return typeof entryData.food_id === 'string'
  }
  if (entryData._t === 'meal') {
    return typeof entryData.meal_id === 'string'
  }
  return false
}

const readSummaryEntryDtos = (storage: Storage): SummaryEntryDto[] => {
  const data = readRaw(storage)
  if (!Array.isArray(data)) return []
  return data.filter(isSummaryEntryDto)
}

const writeSummaryEntryDtos = (
  storage: Storage,
  entries: SummaryEntryDto[],
): void => {
  storage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

const compareByCreatedAtDesc = (
  left: SummaryEntryDto,
  right: SummaryEntryDto,
): number => {
  const leftTime = Date.parse(left.created_at)
  const rightTime = Date.parse(right.created_at)

  if (!Number.isFinite(leftTime) && !Number.isFinite(rightTime)) return 0
  if (!Number.isFinite(leftTime)) return 1
  if (!Number.isFinite(rightTime)) return -1

  return rightTime - leftTime
}

export const summaryApiFakeFactory = (
  storage: Storage,
): {
  deleteEntry: (id: string) => Promise<DeleteSummaryEntryResult>
  listEntries: () => Promise<SummaryEntryDto[]>
  saveEntry: (entry: SummaryEntryDto) => Promise<SummaryEntryDto>
} => {
  return {
    async deleteEntry(id) {
      await delay(150)
      const entries = readSummaryEntryDtos(storage)
      const exists = entries.some((item) => item.entry_id === id)
      if (!exists) return { _t: 'not-found' }
      writeSummaryEntryDtos(
        storage,
        entries.filter((item) => item.entry_id !== id),
      )
      return { _t: 'deleted' }
    },
    async listEntries() {
      await delay(150)
      return [...readSummaryEntryDtos(storage)].sort(compareByCreatedAtDesc)
    },
    async saveEntry(entry) {
      await delay(150)
      const entries = readSummaryEntryDtos(storage)
      const next = entries.some((item) => item.entry_id === entry.entry_id)
        ? entries.map((item) =>
            item.entry_id === entry.entry_id ? entry : item,
          )
        : [...entries, entry]
      writeSummaryEntryDtos(storage, next)
      return entry
    },
  }
}
