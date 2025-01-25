import type { IPaginateQueryParameters, IPaginateResponse } from './types'

export class Paginate<
  ReqQuery extends IPaginateQueryParameters = IPaginateQueryParameters,
>  implements Required<IPaginateQueryParameters> {
  private query: ReqQuery
  public readonly sortBy
  public readonly sortDirection
  public readonly pageNumber
  public readonly pageSize

  constructor(query: ReqQuery) {
    this.query = query

    const {
      sortBy = 'createdAt',
      sortDirection = 'desc',
      pageNumber = 1,
      pageSize = 10
    } = this.query

    this.sortBy = sortBy
    this.sortDirection = sortDirection
    this.pageNumber = Number(pageNumber)
    this.pageSize = Number(pageSize)
  }

  getParameters = (): Required<IPaginateQueryParameters>  => {
    return {
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }
  }

  createResponsePaginate = <I>({ totalCount, items }: {totalCount: number, items: I[]}): IPaginateResponse<I> => {
    return {
      pagesCount: Math.ceil(totalCount / this.pageSize),
      page: this.pageNumber,
      pageSize: this.pageSize,
      totalCount,
      items
    }
  }
}