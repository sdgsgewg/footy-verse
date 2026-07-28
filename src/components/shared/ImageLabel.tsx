import Image from "next/image";

interface ImageLabelProps {
  imageUrl: string;
  label: string;
  size?: number;
}

export function ImageLabel({ imageUrl, label, size = 32 }: ImageLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={imageUrl}
        alt={label ?? ""}
        width={size}
        height={size}
        className="object-contain"
      />

      <span>{label}</span>
    </div>
  );
}
