import ConfederationCard from "@/components/nationalities/summary/ConfederationCard";
import ImageWrapper from "@/components/shared/ImageWrapper";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";
import MarketValueCard from "@/components/shared/summary/MarketValueCard";
import RecordData from "@/components/shared/summary/RecordData";
import { AgeGroup } from "@/enums/AgeGroup";
import { Gender } from "@/enums/Gender";
import { NationalTeamType } from "@/enums/NationalTeamType";
import { getAgeGroupLabel, getGenderLabel } from "@/lib/constants/labels";
import { getNationalTeamTypeLabel } from "@/lib/national-teams/labels";
import { NationalTeamDetailResponse } from "@/types/national-team";
import { useTranslations } from "next-intl";

interface Props {
  summary: NationalTeamDetailResponse;
}

const NationalTeamSummary = ({ summary }: Props) => {
  const t = useTranslations();

  const {
    name,
    gender,
    ageGroup,
    teamType,
    nation,
    squadSize,
    totalMarketValue,
  } = summary;

  const { confederation } = nation;

  return (
    <EntitySummaryLayout
      title={<h1 className="text-4xl font-bold">{name}</h1>}
      image={
        <ImageWrapper
          src={nation.imageUrl}
          alt={name}
          clickable
          hoverOverlay
          aspectRatio="video"
          className={{
            container: "w-40 h-fit",
            image: "w-full object-cover",
          }}
        />
      }
      information={
        <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
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
            label="Team Type"
            content={{
              text: getNationalTeamTypeLabel(teamType as NationalTeamType, t),
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
      side={
        confederation && <ConfederationCard confederation={confederation} />
      }
      footer={
        <MarketValueCard
          value={totalMarketValue}
          subtitle="Total market value"
        />
      }
    />
  );
};

export default NationalTeamSummary;
