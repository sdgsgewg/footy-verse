import RecordRow from "./RecordRow";
import Image from "next/image";
import { ClubTeam } from "@/types/player";

interface PlayerCurrentClubRecordDataProps {
  club: ClubTeam;
}

const PlayerCurrentClubRecordData = ({
  club,
}: PlayerCurrentClubRecordDataProps) => {
  return (
    <RecordRow label="Club">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={club.imageUrl}
          alt={club.name ?? "-"}
          className="w-4 h-4"
          width={16}
          height={16}
        />
        <p>{club.name}</p>
      </div>
    </RecordRow>
  );
};

export default PlayerCurrentClubRecordData;
