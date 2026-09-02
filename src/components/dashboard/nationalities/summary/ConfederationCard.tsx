import { Card, CardContent } from "@/components/ui/card";
// import RecordData from "../../shared/summary/RecordData";
import ImageWrapper from "@/components/shared/ImageWrapper";
import { ConfederationResponse } from "@/types/confederation";

interface Props {
  confederation: ConfederationResponse;
}

const ConfederationCard = ({ confederation }: Props) => {
  const { imageUrl, name } = confederation;

  return (
    <Card className="w-full max-w-72 lg:max-w-64">
      <CardContent className="flex gap-4">
        <ImageWrapper
          src={imageUrl}
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

export default ConfederationCard;
