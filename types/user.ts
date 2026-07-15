
export type UserRole = 'ADMIN' | 'CLIENT';


export interface LoginMutation {
    user_name: string;
    password: string;
}

export interface LoginResponse {
  user_name: string;
  refresh: string;
  access: string;
}