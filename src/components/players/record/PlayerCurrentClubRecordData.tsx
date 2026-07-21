import { getImageUrl } from "@/lib/images/image-url";
import RecordRow from "./RecordRow";
import Image from "next/image";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { IMAGES } from "@/constants/images";
import { ClubSummary } from "@/types/player";

interface PlayerCurrentClubRecordDataProps {
  club: ClubSummary;
}

const PlayerCurrentClubRecordData = ({
  club,
}: PlayerCurrentClubRecordDataProps) => {
  return (
    <RecordRow label="Club">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={
            getImageUrl("club", STORAGE_BUCKETS.CLUBS, club.image) ??
            IMAGES.COMMON.DEFAULT
          }
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
