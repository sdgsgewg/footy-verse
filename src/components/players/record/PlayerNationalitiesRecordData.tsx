import RecordRow from "./RecordRow";
import Image from "next/image";
import { NationalTeam } from "@/types/player";

interface PlayerNationalitiesRecordDataProps {
  nationalities: NationalTeam[];
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
              src={nation.imageUrl}
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
