import ImageWrapper from "./ImageWrapper";

interface ImageLabelProps {
  imageUrl: string;
  label: string;
}

export function ImageLabel({ imageUrl, label }: ImageLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <ImageWrapper
        src={imageUrl}
        alt={label ?? ""}
        className={{
          container: "w-8 h-8",
          image: "object-contain",
        }}
      />

      <span>{label}</span>
    </div>
  );
}
