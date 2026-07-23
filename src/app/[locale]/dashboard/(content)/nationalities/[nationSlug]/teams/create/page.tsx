import CreateNationalTeamPage from "@/components/dashboard/national-teams/CreateNationalTeamPage";
import { getNationalityLookupService } from "@/lib/services/nationalities.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ nationSlug: string }>;
}) {
  const { nationSlug } = await params;

  const nationLookup = await getNationalityLookupService(nationSlug);

  if (!nationLookup) {
    return notFound();
  }

  return <CreateNationalTeamPage nationLookup={nationLookup} />;
}
