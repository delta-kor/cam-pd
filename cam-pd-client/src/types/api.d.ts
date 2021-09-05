type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse {
  ok: boolean;
  token?: string;
  message?: string;
}
