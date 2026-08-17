export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  count?: number;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
}