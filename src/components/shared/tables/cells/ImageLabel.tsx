import ImageWrapper, { AspectRatio } from "../../ImageWrapper";

interface ImageLabelProps {
  image: {
    src: string;
    alt: string;

    aspectRatio?: AspectRatio;

    className?: {
      container?: string;
      image?: string;
      overlay?: string;
    };
  };

  label: React.ReactNode;
}

export function ImageLabel({ image, label }: ImageLabelProps) {
  const { src, alt, aspectRatio, className } = image;

  return (
    <div className="flex items-center gap-3">
      <ImageWrapper
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
        className={className}
      />

      {label}
    </div>
  );
}
