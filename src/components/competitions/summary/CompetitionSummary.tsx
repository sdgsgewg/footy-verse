import ImageWrapper from "@/components/shared/ImageWrapper";
import { IMAGES } from "@/constants/images";
import React from "react";
import RecordData from "../../shared/summary/RecordData";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";
import LocationCard from "./LocationCard";
import { CompetitionDetailResponse } from "@/types/competition";
import { useTranslations } from "next-intl";
import { getParticipantTypeLabel } from "@/lib/competitions/labels";
import { ParticipantType } from "@/enums/ParticipantType";
import { getAgeGroupLabel, getGenderLabel } from "@/lib/constants/labels";
import { Gender } from "@/enums/Gender";
import { AgeGroup } from "@/enums/AgeGroup";

interface Props {
  competition: CompetitionDetailResponse;
}

const CompetitionSummary = ({ competition }: Props) => {
  const t = useTranslations();

  const {
    name,
    imageUrl,
    category,
    scope,
    participantType,
    gender,
    ageGroup,
    foundedYear,
    location,
  } = competition;

  return (
    <EntitySummaryLayout
      title={
        <>
          <h1 className="text-4xl font-bold">{name}</h1>
        </>
      }
      image={
        <ImageWrapper
          src={imageUrl ?? IMAGES.COMMON.DEFAULT}
          alt={name}
          clickable
          hoverOverlay
          aspectRatio="square"
          className={{
            container: "w-40",
            image: "w-full object-contain",
          }}
        />
      }
      information={
        <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
          <RecordData
            label="Category"
            content={{
              text: category.name,
            }}
          />

          <RecordData
            label="Scope"
            content={{
              text: scope.name,
            }}
          />

          <RecordData
            label="Participant"
            content={{
              text: getParticipantTypeLabel(
                participantType as ParticipantType,
                t,
              ),
            }}
          />

          <RecordData
            label="Gender"
            content={{
              text: getGenderLabel(gender as Gender, t),
            }}
          />

          <RecordData
            label="Age Group"
            content={{
              text: getAgeGroupLabel(ageGroup as AgeGroup, t),
            }}
          />

          <RecordData
            label="Founded Year"
            content={{
              text: foundedYear,
            }}
          />
        </div>
      }
      side={location && <LocationCard location={location} />}
      footer={<></>}
    />
  );
};

export default CompetitionSummary;
