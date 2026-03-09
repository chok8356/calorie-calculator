export function exhaustiveMatchingGuard(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`)
}
