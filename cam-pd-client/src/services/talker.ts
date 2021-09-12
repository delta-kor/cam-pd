import Config from '../config';

class TalkerClass {
  private readonly baseUrl: string;
  private ticket!: string;
  private token: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  public setTicket(ticket: string): void {
    this.ticket = ticket;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  private async request<T extends ApiResponse>(
    method: Method,
    path: string,
    data: any = {}
  ): Promise<T> {
    const options: RequestInit = { method };

    if (!this.ticket) throw new Error('Talker is called before assigning ticket');

    options.headers = { Ticket: this.ticket };

    if (this.token) {
      options.headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json';
    }

    let responseData: T;

    try {
      const response = await fetch(this.baseUrl + path, options);
      responseData = await response.json();
    } catch (e: any) {
      if (!e.json) {
        return { ok: false, message: '네트워크 연결이 원할하지 않습니다' } as T;
      }
      responseData = await e.json();
    }

    if (responseData.token) this.token = responseData.token;
    return responseData;
  }

  public get<T>(path: string): Promise<T & ApiResponse> {
    return this.request<T & ApiResponse>('GET', path);
  }

  public post<T>(path: string, data: any): Promise<T & ApiResponse> {
    return this.request<T & ApiResponse>('POST', path, data);
  }
}

const Talker = new TalkerClass(Config.base_url);

export default Talker;
