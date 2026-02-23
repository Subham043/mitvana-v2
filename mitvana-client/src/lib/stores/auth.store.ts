import { create } from "zustand";
import type { AuthType } from "@/lib/type.d.ts";
// import { getProfileHandler, logoutHandler, refreshTokenHandler } from "@/lib/data/dal/profile";

type AuthState = {
  authToken: string | null;
  authUser: AuthType | null;
  setAuth: (user: AuthType, token: string) => void;
  setAuthUser: (user: AuthType) => void;
  removeAuth: () => void;
  // checkUserPersist: () => Promise<void>;
  // logout: () => Promise<void>;
  // refreshToken: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,

  authToken: null,

  setAuth: (authUser: AuthType, authToken: string) => set({ authUser, authToken }),

  setAuthUser: (authUser: AuthType) => set({ authUser }),

  removeAuth: () => {
    set({ authUser: null, authToken: null });
  },

  // checkUserPersist: async () => {
  //   try {
  //     const response = await getProfileServerFunc();
  //     get().setAuthUser(response);
  //   } catch (error) {
  //     get().removeAuth();
  //   }
  // },

  // logout: async () => {
  //   try {
  //     await logoutHandler();
  //     get().removeAuth();
  //   } catch (error) {
  //   }
  // },

  // refreshToken: async () => {
  //   try {
  //     const response = await refreshTokenHandler();
  //     set({ authToken: response.access_token });
  //     // await get().checkUserPersist();
  //     return true;
  //   } catch {
  //     get().removeAuth();
  //     return false;
  //   }
  // },
}));
