export type CamelotNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** A = minor, B = major */
export type CamelotMode = 'A' | 'B'

export type CamelotKey = `${CamelotNumber}${CamelotMode}`

const CAMELOT_PATTERN = /^(1[0-2]|[1-9])([AB])$/
const WHEEL_SIZE = 12

function parseCamelotKey(key: string): { number: CamelotNumber; mode: CamelotMode } {
  const match = CAMELOT_PATTERN.exec(key.trim().toUpperCase())

  if (!match) {
    throw new RangeError(`Invalid Camelot key: "${key}"`)
  }

  return {
    number: Number(match[1]) as CamelotNumber,
    mode: match[2] as CamelotMode,
  }
}

function wrapNumber(number: number): CamelotNumber {
  return (((number - 1 + WHEEL_SIZE) % WHEEL_SIZE) + 1) as CamelotNumber
}

/**
 * Returns the Camelot keys that mix well with `key`, in this order:
 * the key itself, the previous and next number (wrapping 12 <-> 1),
 * and the relative key (same number, opposite mode).
 *
 * @throws {TypeError} when `key` is not a string
 * @throws {RangeError} when `key` is not a valid Camelot key (e.g. "13A", "08A")
 */
export function getCompatibleKeys(key: string): CamelotKey[] {
  if (typeof key !== 'string') {
    throw new TypeError(`Camelot key must be a string, received ${typeof key}`)
  }

  const { number, mode } = parseCamelotKey(key)
  const relativeMode: CamelotMode = mode === 'A' ? 'B' : 'A'

  return [
    `${number}${mode}`,
    `${wrapNumber(number - 1)}${mode}`,
    `${wrapNumber(number + 1)}${mode}`,
    `${number}${relativeMode}`,
  ]
}
