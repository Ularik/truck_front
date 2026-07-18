
export type UserRole = 'ADMIN' | 'CLIENT';


export interface LoginMutation {
    user_name: string;
    password: string;
}

export interface UserData {
  id: number;
  user_name: string;
}

export interface LoginResponse {
  user_name: string;
  refresh: string;
  access: string;
}