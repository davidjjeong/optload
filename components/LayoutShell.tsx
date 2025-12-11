"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideShell = pathname === "/login";

  if (hideShell) {
    return (
      <>
        {children}
        <Toaster position="bottom-right" richColors />
      </>
    );
  }

  return (
    <SidebarProvider>
      <Navbar />
      <SidebarTrigger />
      {children}
      <Toaster position="bottom-right" richColors />
    </SidebarProvider>
  );
}