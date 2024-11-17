export interface IBlogModel {
  id: string
  name: string
  description: string
  websiteUrl: string,
  createdAt?: string,
  isMembership?: boolean
}

export type BlogReqBody = Pick<IBlogModel, 'name' | 'description' | 'websiteUrl'>
