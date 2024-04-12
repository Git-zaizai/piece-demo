export interface Header {
  level: number
  title: string
  slug: string
  link: string
  children: Header[]
}

export type MenuItem = Omit<Header, 'slug' | 'children'> & {
  element: HTMLHeadElement
  children?: MenuItem[]
}

export interface Outline {
  /**
   * outline 中要显示的标题级别。
   * 单个数字表示只显示该级别的标题。
   * 如果传递的是一个元组，第一个数字是最小级别，第二个数字是最大级别。
   * `'deep'` 与 `[2, 6]` 相同，将显示从 `<h2>` 到 `<h6>` 的所有标题。
   *
   * @default 2
   */
  level?: number | [number, number] | 'deep'

  /**
   * 显示在 outline 上的标题。
   *
   * @default 'On this page'
   */
  label?: string
}
