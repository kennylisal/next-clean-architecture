export type QueryResponse<T> = {
  data: T;
  page: number;
  totalItem: number;
};
