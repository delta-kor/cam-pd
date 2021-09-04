interface ApiResponse {
  ok: boolean;
  token?: string;
}

interface ExceptionResponse extends ApiResponse {
  message: string;
}
