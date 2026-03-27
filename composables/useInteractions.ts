const interactions = ref(0)
let registered = false

export function useInteractions() {
  if (!registered) {
    const router = useRouter()
    router.afterEach(() => interactions.value++)
    registered = true
  }
  return {
    interact() {
      interactions.value++
    },
    interactions,
  }
}
