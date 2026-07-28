import { Card, CardContent } from "@/components/ui/card";
import { IMAGES } from "@/constants/images";
import RecordData from "./RecordData";
import ImageWrapper from "@/components/shared/ImageWrapper";
import { ClubTeamResponse } from "@/types/club-team";

interface Props {
  club: ClubTeamResponse;
  joinedAt: string | null;
  contractEnd: string | null;
}

const ClubCard = ({ club, joinedAt, contractEnd }: Props) => {
  const { imageUrl, name } = club;

  return (
    <Card className="w-72">
      <CardContent className="flex gap-4 p-4">
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
          <h3 className="font-semibold">{club.name}</h3>

          {joinedAt && (
            <RecordData
              label="Joined"
              content={{
                text: joinedAt,
              }}
            />
          )}

          {contractEnd && (
            <RecordData
              label="Contract End"
              content={{
                text: contractEnd,
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClubCard;
