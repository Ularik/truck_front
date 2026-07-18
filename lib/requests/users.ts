import axiosApi from "@/constants/axiosApi";
import type { LoginMutation, LoginResponse, UserData } from "@/types/user";

export async function login(user: LoginMutation): Promise<LoginResponse> {
  const result = await axiosApi.post("/user/login", user);
  return result.data;
}

export async function logout() {
  await axiosApi.post("/user/logout");
}

export async function getCSRF() {
    const result = await axiosApi.get("/user/csrf");
    return result.data;
}

export async function getMe(): Promise<UserData> {
  const result = await axiosApi.get("/user/me");
  return result.data;
}