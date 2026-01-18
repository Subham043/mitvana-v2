import { create } from "zustand";
import type { AuthType } from "@/utils/types";
import { nprogress } from "@mantine/nprogress";
import { getProfileHandler, logoutHandler, refreshTokenHandler } from "@/utils/data/dal/profile";

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
    try {
      nprogress.start();
      const response = await getProfileHandler();
      get().setAuthUser(response);
    } catch (error) {
    } finally {
      nprogress.complete();
    }
  },

  logout: async () => {
    try {
      nprogress.start();
      await logoutHandler();
    } catch (error) {
    } finally {
      nprogress.complete();
      get().removeAuth();
    }
  },

  refreshToken: async () => {
    try {
      nprogress.start();
      const response = await refreshTokenHandler();
      set({ authToken: response.access_token });
      await get().checkUserPersist();
      return true;
    } catch {
      get().removeAuth();
      return false;
    } finally {
      nprogress.complete();
    }
  },
}));
