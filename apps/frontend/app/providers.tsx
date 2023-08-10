"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Rubik } from "next/font/google";
import { Router } from "next/router";
import * as React from "react";
import { Toaster } from "react-hot-toast";

const font = Rubik({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export interface ProvidersProps {
  children: React.ReactNode;
}

Router.events.on("routeChangeStart", (url) => {
  console.log("route is changing");
});

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <div className={font.className}>{children}</div>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </NextUIProvider>
  );
}
