import ImageWrapper from "@/components/shared/ImageWrapper";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";
import MarketValueCard from "@/components/shared/summary/MarketValueCard";
import RecordData from "@/components/shared/summary/RecordData";
import { IMAGES } from "@/constants/images";
import { NationalityDetailResponse } from "@/types/nationality";

interface Props {
  summary: NationalityDetailResponse;
}

const NationalitySummary = ({ summary }: Props) => {
  const { name, imageUrl } = summary;

  return (
    <EntitySummaryLayout
      title={<h1 className="text-4xl font-bold">{name}</h1>}
      image={
        <ImageWrapper
          src={imageUrl ?? IMAGES.COMMON.DEFAULT}
          alt={name}
          clickable
          hoverOverlay
          aspectRatio="video"
          className={{
            container: "w-40",
            image: "w-full object-cover",
          }}
        />
      }
      information={
        <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
          <RecordData
            label="Squad Size"
            content={{
              text: "27",
            }}
          />
        </div>
      }
      side={<></>}
      footer={<MarketValueCard value="€1.34bn" subtitle="Total market value" />}
    />
  );
};

export default NationalitySummary;
