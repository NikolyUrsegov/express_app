import type { IPaginateQueryParameters, IPaginateResponse } from "../common/types"

export interface IPostModel {
  id: string
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
}

export type IInputPostModel = Omit<IPostModel, 'blogName' | 'id' | 'createdAt'>
export type IInputPutModel = Omit<IPostModel, 'blogName' | 'createdAt'>
export type IPostPaginateResponse = IPaginateResponse<IPostModel>

export type IPostsPaginateQueryParameters = IPaginateQueryParameters