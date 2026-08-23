"use client";

import { LightboxProvider } from "@/context/LightboxContext";
// import { AudioProvider } from "@/context/AudioContext";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { Profile } from "@/types/profile";
import { User } from "@supabase/supabase-js";

interface ProvidersProps {
  children: React.ReactNode;
  initialUser: User | null;
  initialProfile: Profile | null;
}

export default function Providers({
  children,
  initialUser,
  initialProfile,
}: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange // optional, but recommended to prevent color theme transition when changing pages
    >
      <ToastProvider>
        <AuthProvider initialUser={initialUser} initialProfile={initialProfile}>
          {/* <AudioProvider> */}
          <QueryProvider>
            <LightboxProvider>{children}</LightboxProvider>
          </QueryProvider>
          {/* </AudioProvider> */}
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
