"use client";

import { authService } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@nextui-org/input";
import { useMutation } from "@tanstack/react-query";
import { LoginDto, LoginResponseDto } from "mote-types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
  const saveAuth = useAuthStore((state) => state.saveAuth);
  const router = useRouter();

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string().email().required().min(5),
      password: Yup.string().required().min(5),
    });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation<LoginResponseDto, unknown, LoginDto>({
    mutationFn: (variables) => authService.login(variables),
    onSuccess: (data, variables) => onSuccesfullLogin(data),
  });

  const onSuccesfullLogin = useCallback((data: LoginResponseDto) => {
    saveAuth(data);

    router.push("/dashboard");
  }, []);

  const onSubmit = useCallback(
    async ({ email, password }: LoginDto) => {
      const promise = mutation.mutateAsync({
        email,
        password,
      });

      toast.promise(promise, {
        loading: "Logging in..",
        error: "Could not login",
        success: "Logged in!",
      });

      router.push("/dashboard");
    },
    [router]
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-form py-2">
              <Input
                label="Email"
                type="email"
                required
                validationState={errors.email?.message ? "invalid" : "valid"}
                {...register("email")}
              />
            </div>
            <div className="input-form py-2">
              <Input
                label="Password"
                type="password"
                required
                validationState={errors.password?.message ? "invalid" : "valid"}
                {...register("password")}
              />
            </div>

            <button type="submit" className="btn primary w-full">
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
