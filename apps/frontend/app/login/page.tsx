"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const loginBtn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await login(email);

      router.push("/dashboard");
    },
    [login, email, router]
  );

  return (
    <>
      <style jsx global>
        {`
          body {
            background: rgb(239, 244, 255);
            background: radial-gradient(
              circle,
              rgba(239, 244, 255, 1) 0%,
              rgba(247, 221, 230, 1) 36%,
              rgba(222, 241, 255, 1) 100%
            );
          }
        `}
      </style>

      <div className="h-screen flex justify-center align-center items-center content-center p-5">
        <div
          id="login-container"
          className="flex-col bg-white p-10 rounded-md text-center justify-center items-center align-center "
        >
          <h1 className="title font-semibold text-2xl p-3">Login to account</h1>
          <p id="description" className="text-xs text-gray-500 ">
            Enter your credentials to access your account
          </p>

          <form action="#" onSubmit={loginBtn}>
            <div className="input-form py-2">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="input-form py-2">
              <input
                placeholder="Password"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-2 rounded-md text-sm"
            >
              Contiune
            </button>

            <p className="text-sm py-5">
              Not a member? <a className="text-blue-600">Create Account</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
