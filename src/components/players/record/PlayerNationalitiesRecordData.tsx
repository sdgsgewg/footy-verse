import { getImageUrl } from "@/lib/images/image-url";
import RecordRow from "./RecordRow";
import { NationalitySummary } from "@/types/player";
import Image from "next/image";
import { STORAGE_BUCKETS } from "@/lib/storage";

interface PlayerNationalitiesRecordDataProps {
  nationalities: NationalitySummary[];
}

const PlayerNationalitiesRecordData = ({
  nationalities,
}: PlayerNationalitiesRecordDataProps) => {
  return (
    <RecordRow label="Nationality">
      <div className="flex flex-col gap-1">
        {nationalities.map((nation) => (
          <div key={nation.id} className="flex flex-row items-center gap-2">
            <Image
              src={getImageUrl(
                "nationality",
                STORAGE_BUCKETS.NATIONALITIES,
                nation.image,
              )}
              alt={nation.name}
              width={24}
              height={16}
              className="w-6 h-4"
            />
            <p>{nation.name}</p>
          </div>
        ))}
      </div>
    </RecordRow>
  );
};

export default PlayerNationalitiesRecordData;
