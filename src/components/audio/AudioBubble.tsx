"use client";

import { useContext, useState } from "react";
import { AudioContext } from "../../context/AudioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeMute,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const AudioBubble = () => {
  const { isPaused, togglePlay, volume, lastVolume, changeVolume, trackInfo } =
    useContext(AudioContext);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="fixed bottom-5 right-5 z-9999"
    >
      {/* Expanded Panel */}
      <div
        className={`absolute bottom-14.5 right-0 bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden transition-all duration-200 
        ${isHover ? "opacity-100 w-65 h-45 p-4" : "opacity-0 w-0 h-0 p-0"}`}
      >
        {/* Cover + Title */}
        <div className="flex gap-3">
          <Image
            src={trackInfo.cover}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            alt="Album Cover"
          />
          <div>
            <div className="text-primary font-bold">{trackInfo.title}</div>
            <div className="text-secondary text-xs opacity-80">{trackInfo.artist}</div>
          </div>
        </div>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="mt-4 w-full py-2 rounded-lg bg-tertiary text-tertiary-foreground text-[15px] flex items-center justify-center gap-2 hover:bg-tertiary/80 cursor-pointer"
        >
          <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
          {isPaused ? "Play" : "Pause"}
        </button>

        {/* Volume Slider */}
        <div className="mt-3">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Small Bubble */}
      <div
        onClick={() => changeVolume(volume > 0 ? 0 : lastVolume)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer shadow-lg text-[22px]"
      >
        <FontAwesomeIcon icon={volume === 0 ? faVolumeMute : faVolumeHigh} />
      </div>
    </div>
  );
};

export default AudioBubble;
