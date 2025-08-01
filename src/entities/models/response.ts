export type QueryResponse<T> = {
  data: T;
  page: number;
  totalCount: number;
};
