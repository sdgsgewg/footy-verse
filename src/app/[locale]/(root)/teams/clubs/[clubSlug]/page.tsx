import ClubDetailPage from "@/components/clubs/ClubDetailPage";
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

  return <ClubDetailPage clubLookup={clubLookup} />;
}
