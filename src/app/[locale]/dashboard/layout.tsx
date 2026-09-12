"use client";

import Navbar from "@/components/layout/navbar/dashboard/Navbar";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { usePathname } from "@/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Fixed Sidebar */}
        <Sidebar pathname={pathname} />

        {/* Scrollable Content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="w-full space-y-6 p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
