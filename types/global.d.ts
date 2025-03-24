export { Sorting, FormFields, Content }

global {
  type Sorting = 'latest' | 'top' | 'cheapest'

  interface FormFields<T> {
    accessor: keyof T
    label: string
    type: InputHTMLAttributes['type']
    min?: number
    max?: number
    step?: number
    required?: boolean
    items?: string[]
  }

  type Content =
    | { type: 'media'; content: PostMedia }
    | { type: 'text'; content: PostText }
}
