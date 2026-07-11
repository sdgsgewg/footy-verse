import RecordData from "@/components/shared/RecordData";
import { IMAGES } from "@/constants/images";
import { ClubType, ClubTypeLabels } from "@/enums/ClubType";
import { getClubImageUrl, getNationalityImageUrl } from "@/lib/get-image-url";
import { ClubDetailResponse } from "@/types/club";
import Image from "next/image";
import React from "react";

interface Props {
  club: ClubDetailResponse;
}

const ClubProfile = ({ club }: Props) => {
  const { name, club_type, nation, parent_club } = club;

  return (
    <div className="">
      <div className="bg-primary text-primary-foreground text-2xl font-bold px-5 py-3 uppercase mb-2">
        <p className="text-start">Club Profile</p>
      </div>

      <RecordData label="Name" value={name} />
      {club_type && (
        <RecordData
          label="Club Type"
          value={ClubTypeLabels[club_type as ClubType]}
        />
      )}

      {/* Nation */}
      {nation && (
        <RecordData label="Nation">
          <div className="flex flex-col gap-1">
            <div key={nation?.id} className="flex flex-row items-center gap-2">
              <Image
                src={
                  getNationalityImageUrl(nation.image) ?? IMAGES.COMMON.DEFAULT
                }
                alt={nation.name}
                width={24}
                height={16}
                className="w-6 h-4"
              />
              <p>{nation.name}</p>
            </div>
          </div>
        </RecordData>
      )}

      {/* Parent Club */}
      {parent_club && (
        <RecordData label="Parent Club">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={getClubImageUrl(parent_club.image) ?? IMAGES.COMMON.DEFAULT}
              alt={parent_club.name ?? "-"}
              className="w-4 h-4"
              width={16}
              height={16}
            />
            <p>{parent_club.name}</p>
          </div>
        </RecordData>
      )}
    </div>
  );
};

export default ClubProfile;
