type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse {
  ok: boolean;
  token?: string;
  message?: string;
}

interface Stage {
  uuid: string;
  title: string;
  concert: string;
}
