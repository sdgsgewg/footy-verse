import ClubDetailPage from "@/components/dashboard/clubs/ClubDetailPage";
import { ROUTES } from "@/constants/routes";
import { getClubLookupService } from "@/lib/services/clubs.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ clubSlug: string }>;
}) {
  const { clubSlug } = await params;

  const clubLookup = await getClubLookupService(clubSlug);

  if (!clubLookup) {
    return notFound();
  }

  return (
    <ClubDetailPage
      clubLookup={clubLookup}
      backHref={ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}
    />
  );
}
