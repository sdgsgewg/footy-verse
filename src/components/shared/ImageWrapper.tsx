"use client";

import { IMAGES } from "@/constants/images";
import { useLightbox } from "@/context/LightboxContext";
import Image from "next/image";
import { useState } from "react";

export type AspectRatio = "square" | "video" | "portrait" | "none";

interface Props {
  src: string;
  alt: string;

  gallery?: string[];
  index?: number;

  aspectRatio?: AspectRatio;

  className?: {
    container?: string;
    image?: string;
    overlay?: string;
  };

  hoverOverlay?: boolean;
  priority?: boolean;

  sizes?: string;

  clickable?: boolean;
  children?: React.ReactNode;
}

export default function ImageWrapper({
  src,
  alt,
  gallery,
  index,
  aspectRatio,
  className,
  hoverOverlay,
  priority,
  sizes,
  clickable,
  children,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const { openLightbox } = useLightbox();

  const safeSrc = src || IMAGES.COMMON.DEFAULT;

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    none: "",
  }[aspectRatio ?? "video"];

  return (
    <div
      onClick={
        clickable
          ? () =>
              openLightbox(
                (gallery ?? [safeSrc]).map((img) => ({
                  src: img,
                })),
                index ?? 0,
              )
          : undefined
      }
      className={`relative overflow-hidden ${aspectClass} ${
        clickable ? "cursor-pointer" : ""
      } ${className?.container || ""}`}
    >
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      )}

      <Image
        src={safeSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500 ${className?.image ?? ""}`}
        onLoad={() => setIsLoading(false)}
      />

      {hoverOverlay && (
        <div
          className={`absolute inset-0 ${
            className?.overlay || "bg-black/0 group-hover:bg-black/20"
          } transition`}
        />
      )}

      {children}
    </div>
  );
}
