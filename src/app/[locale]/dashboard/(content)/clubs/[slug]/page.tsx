import ClubDetailPage from "@/components/dashboard/clubs/ClubDetailPage";
import { getClubLookupService } from "@/lib/services/clubs.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const clubLookup = await getClubLookupService(slug);

  if (!clubLookup) {
    return notFound();
  }

  return <ClubDetailPage clubLookup={clubLookup} />;
}
