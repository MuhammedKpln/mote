import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ILoginInfo {
  email: string;
}

interface IAuth {
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  authenticatedUser?: ILoginInfo;
}

export const useAuthStore = create<IAuth>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      logout: async () => {
        Cookies.remove("isAuthenticated");
        set((state) => ({
          isAuthenticated: false,
          authenticatedUser: undefined,
        }));
      },
      login: async (email: string) => {
        Cookies.set("isAuthenticated", true.toString());

        set((state) => ({
          isAuthenticated: true,
          authenticatedUser: {
            email: email,
          },
        }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
