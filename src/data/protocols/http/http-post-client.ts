// interface segregation principle : interfaces pequenas. so com o post sem o get
export type HttpPostParams = {
  url: string
  body?: object
}
export interface HttpPostClient{
  post: (params: HttpPostParams) => Promise<void>
}
