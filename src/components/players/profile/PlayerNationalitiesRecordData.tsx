import { NationalityResponse } from "@/types/nationality";
import RecordRow from "./RecordRow";
import Image from "next/image";
import ImageWrapper from "@/components/shared/ImageWrapper";

interface PlayerNationalitiesRecordDataProps {
  nationalities: NationalityResponse[];
}

const PlayerNationalitiesRecordData = ({
  nationalities,
}: PlayerNationalitiesRecordDataProps) => {
  return (
    <RecordRow label="Nationality">
      <div className="flex flex-col gap-1">
        {nationalities.map((nation) => (
          <div key={nation.id} className="flex flex-row items-center gap-2">
            <ImageWrapper
              src={nation.imageUrl}
              alt={nation.name}
              className={{
                container: "w-8 h-5 rounded-sm border",
                image: "object-cover",
              }}
            />
            <p>{nation.name}</p>
          </div>
        ))}
      </div>
    </RecordRow>
  );
};

export default PlayerNationalitiesRecordData;
