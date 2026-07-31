import React from "react";
import { ImageLabel } from "./ImageLabel";

interface Props {
  imageUrl: string;
  label: string;
}

const RegionImageLabel = ({ imageUrl, label }: Props) => {
  return (
    <ImageLabel
      image={{
        src: imageUrl,
        alt: label,
        aspectRatio: "square",
        className: {
          container: "w-8 h-8",
          image: "object-contain",
        },
      }}
      label={label}
    />
  );
};

export default RegionImageLabel;
