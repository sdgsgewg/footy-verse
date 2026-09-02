import ImageWrapper from "@/components/shared/ImageWrapper";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";
import { NationalityDetailResponse } from "@/types/nationality";
import ConfederationCard from "./ConfederationCard";

interface Props {
  summary: NationalityDetailResponse;
}

const NationalitySummary = ({ summary }: Props) => {
  const { name, imageUrl, confederation } = summary;

  return (
    <EntitySummaryLayout
      title={<h1 className="text-4xl font-bold">{name}</h1>}
      image={
        <ImageWrapper
          src={imageUrl}
          alt={name}
          priority
          clickable
          hoverOverlay
          aspectRatio="video"
          className={{
            container: "w-40",
            image: "w-full object-cover",
          }}
        />
      }
      information={<></>}
      side={
        confederation && <ConfederationCard confederation={confederation} />
      }
      footer={<></>}
    />
  );
};

export default NationalitySummary;
