import { create } from "zustand";
import type { AuthType } from "@/lib/type.d.ts";
import type { SessionData } from "@/lib/integrations/session/useAppSession";

type AuthState = {
  authToken: string | null;
  authUser: AuthType | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthType, token: string) => void;
  setAuthUser: (user: AuthType) => void;
  removeAuth: () => void;
  hydrateFromSession: (session: SessionData | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,

  authToken: null,

  isAuthenticated: false,

  setAuth: (authUser: AuthType, authToken: string) =>
    set({ authUser, authToken, isAuthenticated: true }),

  setAuthUser: (authUser: AuthType) => set({ authUser }),

  removeAuth: () => {
    set({ authUser: null, authToken: null, isAuthenticated: false });
  },

  hydrateFromSession: (session: SessionData | null) => {
    if (session) {
      const { access_token, refresh_token, ...user } = session;
      useAuthStore.getState().setAuth(user as AuthType, access_token);
    } else {
      useAuthStore.getState().removeAuth();
    }
  },
}));
