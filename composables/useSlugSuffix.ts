/**
 * Returns a pseudo-random 4 character hex string
 */
export function useSlugSuffix() {
  return Math.floor(Math.random() * Math.pow(2, 16)).toString(16)
}
