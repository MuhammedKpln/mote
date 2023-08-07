import { useAuthStore } from "@/app/store/auth.store";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export class BaseService {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });

    this.axios.interceptors.request.use(this.authInterceptor, (err) =>
      Promise.reject(err)
    );
  }

  private authInterceptor(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    if (config.headers) {
      const accessToken = useAuthStore.getState().accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
}
