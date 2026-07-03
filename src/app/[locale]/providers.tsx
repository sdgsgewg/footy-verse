"use client";

// import { AudioProvider } from "@/context/AudioContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
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
      <AuthProvider initialUser={initialUser} initialProfile={initialProfile}>
        {/* <AudioProvider> */}
        <PlayerProvider>
          <QueryProvider>{children}</QueryProvider>
        </PlayerProvider>
        {/* </AudioProvider> */}
      </AuthProvider>
    </ThemeProvider>
  );
}
