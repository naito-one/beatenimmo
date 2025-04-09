export function useSorting() {
  const s = useRoute().query['sorting']
  return s && ['latest', 'top', 'cheapest'].includes(s.toString())
    ? (s.toString() as Sorting)
    : 'top'
}
