import React from "react";
import { ImageLabel } from "./ImageLabel";

interface Props {
  imageUrl: string;
  label: string;
}

const ClubImageLabel = ({ imageUrl, label }: Props) => {
  return (
    <ImageLabel
      image={{
        src: imageUrl,
        alt: label,
        aspectRatio: "none",
        className: {
          container: "w-7 h-7",
          image: "object-contain",
        },
      }}
      label={label}
    />
  );
};

export default ClubImageLabel;
