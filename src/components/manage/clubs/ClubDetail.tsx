import { getImageUrl } from "@/lib/get-image-url";
import { ClubDetailResponse } from "@/types/club";
import ClubProfile from "./ClubProfile";
import ClubPlayers from "./ClubPlayers";
import DetailPageLayout from "@/components/layout/DetailPageLayout";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { getDefaultImage } from "@/utils/image";

interface ClubDetailProps {
  club: ClubDetailResponse;
}

const ClubDetail = ({ club }: ClubDetailProps) => {
  const { image, name } = club;

  const modifiedImage =
    getImageUrl(image, STORAGE_BUCKETS.CLUBS) ?? getDefaultImage("club");

  return (
    <DetailPageLayout title={name} image={modifiedImage}>
      <ClubProfile club={club} />
      <ClubPlayers />
    </DetailPageLayout>
  );
};

export default ClubDetail;
