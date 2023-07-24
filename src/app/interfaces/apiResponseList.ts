export interface ApiResponseList<T> {
  success: boolean;
  data: T[];
  errorMessage: string | null;
}
