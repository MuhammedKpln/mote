import Cookies from "js-cookie";
import { LoginResponseDto } from "mote-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuth {
  isAuthenticated: boolean;
  authenticatedUser?: Pick<LoginResponseDto, "user">["user"];
  accessToken?: string;
  saveAuth: (loginResponse: LoginResponseDto) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<IAuth>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      logout: async () => {
        Cookies.remove("isAuthenticated");

        set((_) => ({
          isAuthenticated: false,
          authenticatedUser: undefined,
          accessToken: undefined,
        }));
      },
      saveAuth: (loginResponse: LoginResponseDto) => {
        Cookies.set("isAuthenticated", true.toString());

        set(() => ({
          isAuthenticated: true,
          authenticatedUser: loginResponse.user,
          accessToken: loginResponse.access_token,
        }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
