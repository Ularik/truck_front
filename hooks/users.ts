import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "@/lib/requests/users";
import { useAuthStore } from "@/lib/store/userStore";

export function useLogin() {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: login,
  });
}
