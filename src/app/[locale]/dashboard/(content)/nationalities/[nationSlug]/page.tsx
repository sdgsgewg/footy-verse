import NationalityDetailPage from "@/components/dashboard/nationalities/NationalityDetailPage";
import { ROUTES } from "@/constants/routes";
import { getNationalityLookupService } from "@/lib/services/nationalities.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ nationSlug: string }>;
}) {
  const { nationSlug } = await params;

  const nationalityLookup = await getNationalityLookupService(nationSlug);

  if (!nationalityLookup) {
    return notFound();
  }

  return (
    <NationalityDetailPage
      nationalityLookup={nationalityLookup}
      backHref={ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}
    />
  );
}
