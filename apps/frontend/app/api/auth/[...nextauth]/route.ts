import { authService } from "@/services/auth.service";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const authHandler: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: parseInt(process.env.JWT_MAX_AGE!)
  },
  providers: [
    Credentials({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const form = new FormData();
        form.append("email", credentials.email);
        form.append("password", credentials.password);

        const authResponse = await authService.login({
          email: credentials.email,
          password: credentials.password,
        });

        return {
          id: authResponse.user.id,
          email: authResponse.user.email,
          image: authResponse.user.profile_picture,
          name: authResponse.user.username,
          accessToken: authResponse.access_token,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      (session as any).token = token.accessToken;

      return session;
    },
    jwt: ({ token, user, account }) => {
      if (account) {
        token.accessToken = (user as any).accessToken;
      }

      return token;
    },
  },
};

const requestHandler = NextAuth(authHandler);

export { requestHandler as GET, requestHandler as POST };
