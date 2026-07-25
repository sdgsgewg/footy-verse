import EditNationalityPage from "@/components/dashboard/nationalities/EditNationalityPage";
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

  return <EditNationalityPage nationalityLookup={nationalityLookup} />;
}
