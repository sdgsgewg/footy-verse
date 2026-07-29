import EditConfederationPage from "@/components/dashboard/confederations/EditConfederationPage";
import { getConfederationLookupService } from "@/lib/services/confederations.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const confederationLookup = await getConfederationLookupService(slug);

  if (!confederationLookup) {
    return notFound();
  }

  return <EditConfederationPage confederationLookup={confederationLookup} />;
}
