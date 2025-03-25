export { Sorting, FormFields, Content, Editable, Optional }

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

  type Content<M = PostMedia, T = PostText> =
    | { type: 'media'; content: M }
    | { type: 'text'; content: T }

  type Editable<T> = T & {
    _deleted?: boolean
    _tempId?: number
  }

  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
}
