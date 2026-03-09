export type ActivityLevel =
  | 'athlete'
  | 'high'
  | 'light'
  | 'moderate'
  | 'sedentary'

export type GoalType = 'gain' | 'lose' | 'maintain'

export type MacroTargets = {
  carbs: number
  fat: number
  kcal: number
  protein: number
}

export type ProfileSettings = {
  customTargets: MacroTargets
  mode: 'custom' | 'recommended'
  recommended: RecommendedInputs
  updatedAt: string
}

export type RecommendedInputs = {
  activity: ActivityLevel
  age: number
  goal: GoalType
  heightCm: number
  sex: Sex
  weightKg: number
}

export type Sex = 'female' | 'male'
