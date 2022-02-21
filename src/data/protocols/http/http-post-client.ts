// interface segregation principle : interfaces pequenas. so com o post sem o get
export interface HttpPostClient{
  post: (url: string) => Promise<void>
}
