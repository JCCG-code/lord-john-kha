import { describe, expect, it } from 'vitest'
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

    it('wraps 12B forwards to 1B in major mode', () => {
      expect(getCompatibleKeys('12B')).toEqual(['12B', '11B', '1B', '12A'])
    })

    it('returns the relative minor key for 1A', () => {
      expect(getCompatibleKeys('1A')).toEqual(['1A', '12A', '2A', '1B'])
    })
  })

  describe('normalization', () => {
    it('trims whitespace and accepts lowercase letters', () => {
      expect(getCompatibleKeys(' 8a ')).toEqual(['8A', '7A', '9A', '8B'])
    })
  })

  describe('invalid input', () => {
    it.each([
      '',
      '13A',
      '0A',
      '8C',
      'A8',
      '08A',
      '8 A',
      '8AA',
      '1 2A',
      '-1A',
      '8.0A',
      '8\n'
    ])('throws RangeError for invalid key "%s"', (key) => {
      expect(() => getCompatibleKeys(key)).toThrow(RangeError)
    })

    it('includes the original input in the error message', () => {
      expect(() => getCompatibleKeys(' 13A ')).toThrow(
        'Invalid Camelot key: " 13A "'
      )
    })

    it.each([8, null, undefined])(
      'throws TypeError when the input is not a string (%s)',
      (key) => {
        expect(() => getCompatibleKeys(key as unknown as string)).toThrow(
          TypeError
        )
      }
    )
  })
})
