export function useSorting() {
  const query = useQuery()
  return computed(() => {
    const s = query.value['sorting']
    return s && ['latest', 'top', 'cheapest'].includes(s.toString())
      ? (s.toString() as Sorting)
      : 'top'
  })
}
