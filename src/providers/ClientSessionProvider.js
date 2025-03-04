"use client"

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function SessionAndQueryProvider({ session, children }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider
        client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} position="bottom-left" />
      </QueryClientProvider>
    </SessionProvider>
  );
}