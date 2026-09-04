import ImageWrapper from "@/components/shared/ImageWrapper";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";
import RecordData from "@/components/shared/summary/RecordData";
import { IMAGES } from "@/constants/images";
import { ClubDetailResponse } from "@/types/club";

interface Props {
  summary: ClubDetailResponse;
}

const ClubSummary = ({ summary }: Props) => {
  const { fullName, shortName, imageUrl, nation } = summary;

  return (
    <EntitySummaryLayout
      title={<h1 className="text-4xl font-bold">{shortName}</h1>}
      image={
        <ImageWrapper
          src={imageUrl ?? IMAGES.COMMON.DEFAULT}
          alt={fullName}
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
          {nation && (
            <RecordData
              label="Nationality"
              content={{
                text: nation.name,
                imageUrl: nation.imageUrl,
              }}
            />
          )}
        </div>
      }
      side={<></>}
      footer={<></>}
    />
  );
};

export default ClubSummary;
