import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

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

  private async authInterceptor(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    if (config.headers) {
      config.withCredentials = true

      const session = await getSession()
      const accessToken = (session as any)?.token;
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  }
}
