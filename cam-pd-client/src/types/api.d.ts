type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

namespace ApiResponse {
  export namespace User {
    export interface Get {
      nickname: string;
    }

    export interface Create {}
  }

  export namespace Stage {
    export interface Get {
      stages: Stage[];
    }

    export interface CheckData {
      score: number;
      personal_best: number;
      world_best: number;
    }
  }
}

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
