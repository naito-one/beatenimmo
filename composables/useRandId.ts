/**
 * Returns a pseudo-random negative number
 */
export function useRandId() {
  return -Math.floor(Math.random() * Math.pow(2, 16))
}
