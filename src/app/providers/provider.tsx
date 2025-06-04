"use client";

import Appbar from "@/components/Appbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Appbar />
      {children}
    </SessionProvider>
  );
}
