export interface ApiResponse<T> {
  success: boolean;
  data: T;
  dataList: T[];
  errorMessage: string | null;
}
