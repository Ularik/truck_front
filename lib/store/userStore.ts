import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  user_name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setAuth: (
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
    isAuthenticated?: boolean,
  ) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken, isAuthenticated = true) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: isAuthenticated,
        }),

      setAccessToken: (accessToken) => set({ accessToken }),

      logout: async () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
