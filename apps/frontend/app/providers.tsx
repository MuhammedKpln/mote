"use client";

import { NextUIProvider } from "@nextui-org/system";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import * as React from "react";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const dehydratedState = dehydrate(queryClient);

  return (
    <NextUIProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>{children}</Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
}
