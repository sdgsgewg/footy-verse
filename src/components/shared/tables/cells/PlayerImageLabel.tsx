import React from "react";
import { ImageLabel } from "./ImageLabel";

interface Props {
  imageUrl: string;
  label: string;
  subtitle?: string;
}

const PlayerImageLabel = ({ imageUrl, label, subtitle }: Props) => {
  return (
    <ImageLabel
      image={{
        src: imageUrl,
        alt: label,
        aspectRatio: "portrait",
        className: {
          container: "w-8 h-10",
          image: "object-cover",
        },
      }}
      label={
        <div className="flex flex-col justify-between gap-1">
          <span className="font-semibold">{label}</span>
          {subtitle && <span className="text-xs">{subtitle}</span>}
        </div>
      }
    />
  );
};

export default PlayerImageLabel;
