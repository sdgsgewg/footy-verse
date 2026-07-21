import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { NationalityListItem } from "@/types/nationality";

export function useNationalityActions() {
  const router = useRouter();

  const handleView = (nation: NationalityListItem) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.NATIONALITIES}/${nation.slug}`);
  };

  return {
    handleView,
  };
}
