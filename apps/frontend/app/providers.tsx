"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Router } from "next/router";
import * as React from "react";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

export interface ProvidersProps {
  children: React.ReactNode;
}

Router.events.on("routeChangeStart", (url) => {
  console.log("route is changing");
});

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
}
