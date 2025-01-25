import type { IPaginateResponse, IPaginateQueryParameters } from "../common/types"

export interface IBlogModel {
  id: string
  name: string
  description: string
  websiteUrl: string,
  createdAt?: string,
  isMembership?: boolean
}

export type BlogReqBody = Pick<IBlogModel, 'name' | 'description' | 'websiteUrl'>

export type IBlogsPaginateResponse = IPaginateResponse<IBlogModel>

export interface IBlogsPaginateQueryParameters extends IPaginateQueryParameters{
  searchNameTerm?: string | null
}

