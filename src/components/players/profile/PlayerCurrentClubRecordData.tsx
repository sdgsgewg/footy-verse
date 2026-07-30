import { ClubTeamResponse } from "@/types/club-team";
import RecordRow from "./RecordRow";
import Image from "next/image";
import ImageWrapper from "@/components/shared/ImageWrapper";

interface PlayerCurrentClubRecordDataProps {
  club: ClubTeamResponse;
}

const PlayerCurrentClubRecordData = ({
  club,
}: PlayerCurrentClubRecordDataProps) => {
  const { imageUrl, name } = club;

  return (
    <RecordRow label="Club">
      <div className="flex flex-row items-center gap-2">
        <ImageWrapper
          src={imageUrl}
          alt={name}
          className={{
            container: "w-8 h-8",
            image: "object-contain",
          }}
        />
        <p>{club.name}</p>
      </div>
    </RecordRow>
  );
};

export default PlayerCurrentClubRecordData;
