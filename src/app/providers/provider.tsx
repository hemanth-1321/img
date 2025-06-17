"use client";

import { Appbar } from "@/components/Appbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Appbar />
      {children}

      <Toaster />
    </SessionProvider>
  );
}
