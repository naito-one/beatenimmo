import type { LocationQuery } from 'vue-router'
// declare outside of the function so everyone uses the same hook
const route = useRoute()
const router = useRouter()
const query: Ref<LocationQuery> = ref(route.query)
router.afterEach((route) => {
  query.value = route.query
})
export function useQuery() {
  return query
}
