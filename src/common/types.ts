export interface IPaginateResponse <Item = unknown> {
  pagesCount?: number
  page?: number
  pageSize?: number
  totalCount?: number
  items: Item[]
}

export type SortByType = 'createdAt' | string

export type SortDirection = 'asc' | 'desc'

export interface IPaginateQueryParameters {
  sortBy?: SortByType
  sortDirection?: SortDirection
  pageNumber?: number
  pageSize?: number
}