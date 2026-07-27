"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type LightboxImage = {
  src: string;
  alt?: string;
};

type LightboxContextType = {
  openLightbox: (images: LightboxImage[], index?: number) => void;
  closeLightbox: () => void;
};

const LightboxContext = createContext<LightboxContextType | null>(null);

export const useLightbox = () => {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within provider");
  return ctx;
};

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (imgs: LightboxImage[], startIndex = 0) => {
    setImages(imgs);
    setIndex(startIndex);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      <Lightbox
        open={isOpen}
        close={closeLightbox}
        index={index}
        slides={images}
        plugins={[Zoom]}
        render={{
          buttonPrev: images.length > 1 ? undefined : () => null,
          buttonNext: images.length > 1 ? undefined : () => null,
        }}
      />
    </LightboxContext.Provider>
  );
};
