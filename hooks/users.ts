import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout, getMe, getCSRF } from "@/lib/requests/users";


export function useLogin() {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: login,
  });
}

export function useLogout() {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: logout,
  });
}

export function useCSRF() {
    return useQuery({
      queryKey: [],
      queryFn: getCSRF,
    });
}


export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe
  })
}