"use client";

import { usePathname } from "next/navigation";
import { createContext, useRef, useState, useEffect } from "react";

export interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null> | null;
  isPaused: boolean;
  togglePlay: () => void;
  volume: number;
  lastVolume: number;
  changeVolume: (value: number) => void;
  trackInfo: {
    title: string;
    artist: string;
    cover: string;
  };
}

export const AudioContext = createContext<AudioContextType>(
  {} as AudioContextType,
);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState<number>(0.1);
  const [lastVolume, setLastVolume] = useState<number>(0.1);

  const [trackInfo, setTrackInfo] = useState({
    title: "Theme Song",
    artist: "Default Artist",
    cover: "/images/audio-cover.jpg",
  });

  const pathname = usePathname();

  // Tentukan audio + metadata berdasarkan URL
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let newSrc = "/audio/theme.mp3";
    let newTrack = {
      title: "Theme Song",
      artist: "Default Artist",
      cover: "/images/audio-cover.jpg",
    };

    // Arsenal
    if (pathname.startsWith("/club/arsenal")) {
      newSrc = "/audio/arsenal-theme.mp3";
      newTrack = {
        title: "The Angel (North London Forever)",
        artist: "Louis Dunford",
        cover: "/images/arsenal-cover.jpg",
      };
    }

    // Indonesia
    else if (pathname.startsWith("/nation/indonesia")) {
      newSrc = "/audio/indonesia-theme.mp3";
      newTrack = {
        title: "Tanah Airku",
        artist: "Ibu Sud",
        cover: "/images/indonesia-cover.jpg",
      };
    }

    // Cegah reload kalau src sama
    if (!audio.src.endsWith(newSrc)) {
      audio.src = newSrc;
      audio.volume = volume;

      audio
        .play()
        .then(() => setIsPaused(false))
        .catch(() => console.log("Autoplay blocked"));
    }

    // Update metadata
    setTrackInfo(newTrack);
  }, [pathname, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPaused(audio.paused);
  };

  const changeVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = value;

    if (vol > 0) {
      setLastVolume(vol);
    }

    audio.volume = vol;
    setVolume(vol);
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        isPaused,
        togglePlay,
        volume,
        lastVolume,
        changeVolume,
        trackInfo,
      }}
    >
      <audio ref={audioRef} autoPlay loop style={{ display: "none" }} />
      {children}
    </AudioContext.Provider>
  );
};
