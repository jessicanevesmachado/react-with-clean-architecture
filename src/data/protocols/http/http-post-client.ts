import { HttpResponse } from ".";

// interface segregation principle : interfaces pequenas. so com o post sem o get
export type HttpPostParams<T> = {
  url: string;
  body?: any;
};
export interface HttpPostClient<T, R> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>;
}
