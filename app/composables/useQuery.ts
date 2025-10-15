import type { LocationQuery } from 'vue-router'
export function useQuery() {
  const route = useRoute()
  const router = useRouter()
  const query: Ref<LocationQuery> = ref(route.query)
  router.afterEach((route) => {
    query.value = route.query
  })
  return query
}
