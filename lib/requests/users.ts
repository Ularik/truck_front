import axiosApi from "@/constants/axiosApi";
import type { LoginMutation, LoginResponse } from "@/types/user";

export async function login(user: LoginMutation): Promise<LoginResponse> {
  const result = await axiosApi.post("/token/pair", user);
  return result.data;
}

