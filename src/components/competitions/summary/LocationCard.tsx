import { Card, CardContent } from "@/components/ui/card";
import { IMAGES } from "@/constants/images";
import RecordData from "../../shared/summary/RecordData";
import ImageWrapper from "@/components/shared/ImageWrapper";
import { LocationResponse } from "@/types/competition";

interface Props {
  location: LocationResponse;
}

const LocationCard = ({ location }: Props) => {
  if (!location) return null;

  const { imageUrl, name } = location;

  return (
    <Card className="w-full max-w-72 lg:max-w-64">
      <CardContent className="flex gap-4">
        <ImageWrapper
          src={imageUrl ?? IMAGES.COMMON.DEFAULT_PLAYER}
          alt={name}
          clickable
          hoverOverlay
          className={{
            container: "relative h-20 w-20 shrink-0",
            image: "w-full object-contain",
          }}
        />

        <div className="space-y-2">
          <h3 className="font-semibold">{name}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
