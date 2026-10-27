import { describe, it, expect } from 'vitest'
import { getCompatibleKeys } from './camelot'

describe('getCompatibleKeys', () => {
  describe('valid keys', () => {
    it('returns the same key, both neighbours and the relative key for 8A', () => {
      expect(getCompatibleKeys('8A')).toEqual(['8A', '7A', '9A', '8B'])
    })

    it('wraps 1B backwards to 12B and returns its relative 1A', () => {
      expect(getCompatibleKeys('1B')).toEqual(['1B', '12B', '2B', '1A'])
    })

    it('wraps 12A forwards to 1A and returns its relative 12B', () => {
      expect(getCompatibleKeys('12A')).toEqual(['12A', '11A', '1A', '12B'])
    })
  })

  describe('normalization', () => {
    it('trims whitespace and accepts lowercase letters', () => {
      expect(getCompatibleKeys(' 8a ')).toEqual(getCompatibleKeys('8A'))
    })
  })

  describe('invalid input', () => {
    it.each(['', '13A', '0A', '8C', 'A8', '08A'])(
      'throws RangeError for invalid key "%s"',
      (key) => {
        expect(() => getCompatibleKeys(key)).toThrow(RangeError)
      },
    )

    it.each([8, null, undefined])(
      'throws TypeError when the input is not a string (%s)',
      (key) => {
        expect(() => getCompatibleKeys(key as unknown as string)).toThrow(TypeError)
      },
    )
  })
})
