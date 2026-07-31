import ImageWrapper from "@/components/shared/ImageWrapper";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";
import MarketValueCard from "@/components/shared/summary/MarketValueCard";
import RecordData from "@/components/shared/summary/RecordData";
import { AgeGroup } from "@/enums/AgeGroup";
import { SquadType } from "@/enums/SquadType";
import { getSquadTypeLabel } from "@/lib/clubs/labels";
import { getAgeGroupLabel } from "@/lib/constants/labels";
import { ClubTeamDetailResponse } from "@/types/club-team";
import { useTranslations } from "next-intl";

interface Props {
  summary: ClubTeamDetailResponse;
}

const ClubTeamSummary = ({ summary }: Props) => {
  const t = useTranslations();

  const { name, squadType, ageGroup, club, squadSize, totalMarketValue } =
    summary;

  return (
    <EntitySummaryLayout
      title={<h1 className="text-4xl font-bold">{name}</h1>}
      image={
        <ImageWrapper
          src={club.imageUrl}
          alt={name}
          clickable
          hoverOverlay
          aspectRatio="square"
          className={{
            container: "w-40",
            image: "object-contain",
          }}
        />
      }
      information={
        <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
          <RecordData
            label="Squad Type"
            content={{
              text: getSquadTypeLabel(squadType as SquadType, t),
            }}
          />

          <RecordData
            label="Age Group"
            content={{
              text: getAgeGroupLabel(ageGroup as AgeGroup, t),
            }}
          />

          <RecordData
            label="Squad Size"
            content={{
              text: squadSize,
            }}
          />
        </div>
      }
      side={<></>}
      footer={
        <MarketValueCard
          value={totalMarketValue}
          subtitle="Total market value"
        />
      }
    />
  );
};

export default ClubTeamSummary;
