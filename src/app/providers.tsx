"use client";

import { AudioProvider } from "@/context/AudioContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { ThemeProvider } from "@/providers/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AudioProvider>
        <PlayerProvider>{children}</PlayerProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
