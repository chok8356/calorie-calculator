import { describe, expect, it } from 'vitest'

import { useTestId } from './use-test-id'

describe('useTestId', () => {
  it('id', () => {
    const { getTestId } = useTestId('id')
    expect(getTestId('name')).toBe(`id-name`)
  })
})
