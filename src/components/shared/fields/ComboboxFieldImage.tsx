import { Entity } from "@/config/entities";
import ImageWrapper from "../ImageWrapper";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  entityKey: Entity;
}

const ComboboxFieldImage = ({ src, alt, entityKey }: Props) => {
  return (
    <ImageWrapper
      src={src}
      alt={alt}
      className={{
        container: cn(
          "shadow-sm",
          ["nationality", "nationalTeam"].includes(entityKey)
            ? "w-6 h-4 rounded-sm"
            : "w-6 h-6",
        ),
        image: cn(
          "w-full h-full",
          entityKey === "club" ? "object-contain" : "object-cover",
        ),
      }}
    />
  );
};

export default ComboboxFieldImage;
