import React from "react";
import { ImageLabel } from "./ImageLabel";

interface Props {
  imageUrl: string;
  label: string;
}

const NationalityImageLabel = ({ imageUrl, label }: Props) => {
  return (
    <ImageLabel
      image={{
        src: imageUrl,
        alt: label,
        aspectRatio: "video",
        className: {
          container: "w-8 h-6 rounded-sm border",
          image: "object-cover",
        },
      }}
      label={label}
    />
  );
};

export default NationalityImageLabel;
