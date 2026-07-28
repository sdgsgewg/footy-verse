import EditRegionPage from "@/components/dashboard/regions/EditRegionPage";
import { getRegionLookupService } from "@/lib/services/regions.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const regionLookup = await getRegionLookupService(slug);

  if (!regionLookup) {
    return notFound();
  }

  return <EditRegionPage regionLookup={regionLookup} />;
}
