import { create } from "zustand";
import type { AuthType } from "../types";
import { getProfileHandler, logoutHandler, refreshTokenHandler } from "../data/dal/profile";

type AuthState = {
  authToken: string | null;
  authUser: AuthType | null;
  setAuth: (user: AuthType, token: string) => void;
  setAuthUser: (user: AuthType) => void;
  removeAuth: () => void;
  checkUserPersist: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,

  authToken: null,

  setAuth: (authUser: AuthType, authToken: string) => set({ authUser, authToken }),

  setAuthUser: (authUser: AuthType) => set({ authUser }),

  removeAuth: () => {
    set({ authUser: null, authToken: null });
  },

  checkUserPersist: async () => {
    const response = await getProfileHandler();
    get().setAuthUser(response);
  },

  logout: async () => {
    await logoutHandler();
    get().removeAuth();
  },

  refreshToken: async () => {
    try {
      const response = await refreshTokenHandler();
      get().setAuth(response, response.access_token);
      return true;
    } catch {
      get().removeAuth();
      return false;
    }
  },
}));
