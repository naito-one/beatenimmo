export function usePersist() {
  return {
    getFlag(key: string) {
      if (import.meta.client) {
        return Boolean(localStorage.getItem(key))
      }
      return false
    },
    setFlag(key: string) {
      if (import.meta.client) {
        localStorage.setItem(key, 'true')
      }
    },
  }
}
