import EditPositionCategoryPage from "@/components/dashboard/position-categories/EditPositionCategoryPage";
import { getPositionCategoryLookupService } from "@/lib/services/position-categories.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const positionCategoryLookup = await getPositionCategoryLookupService(slug);

  if (!positionCategoryLookup) {
    return notFound();
  }

  return (
    <EditPositionCategoryPage positionCategoryLookup={positionCategoryLookup} />
  );
}
