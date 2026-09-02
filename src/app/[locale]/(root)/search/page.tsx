import SearchPage from "@/components/search/SearchPage";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return <SearchPage query={params.q ?? ""} />;
}
