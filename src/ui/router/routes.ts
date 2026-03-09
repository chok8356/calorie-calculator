import { useRoute } from 'vue-router'

const INDEX = '/'
const SUMMARY = '/summary'
const FOODS = '/foods'
const MEALS = '/meals'
const PROFILE = '/profile'
const DESIGN = '/design'

export const ROUTES = {
  DESIGN,
  FOODS,
  INDEX,
  MEALS,
  PROFILE,
  SUMMARY,
} as const

export type PathParams = { [P in RoutePath]: ParamsOf<P> }
type ParamNames<S extends string> = S extends `${string}:${infer P}/${infer R}`
  ? P | ParamNames<`/${R}`>
  : S extends `${string}:${infer P}`
    ? P
    : never

type ParamsOf<S extends string> = [ParamNames<S>] extends [never]
  ? object
  : { [K in ParamNames<S>]: string }
type RouteKey = keyof typeof ROUTES

type RoutePath = (typeof ROUTES)[RouteKey]

export function useParamsFor<P extends RoutePath>(): Readonly<ParamsOf<P>> {
  const route = useRoute()
  return route.params as Readonly<ParamsOf<P>>
}
