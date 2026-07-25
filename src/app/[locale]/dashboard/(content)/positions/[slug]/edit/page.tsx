import EditPositionPage from "@/components/dashboard/positions/EditPositionPage";
import { getPositionLookupService } from "@/lib/services/positions.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const positionLookup = await getPositionLookupService(slug);

  if (!positionLookup) {
    return notFound();
  }

  return <EditPositionPage positionLookup={positionLookup} />;
}
