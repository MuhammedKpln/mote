"use client";

import { NextUIProvider } from "@nextui-org/system";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
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

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <PersistQueryClientProvider
          persistOptions={{ persister }}
          client={queryClient}
        >
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </PersistQueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
}
