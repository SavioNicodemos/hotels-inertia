export type BaseResponse<T = any> = {
  success: boolean;
  message: string;
  data: T;
};

export type BackendPagination<T = any> = {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};
