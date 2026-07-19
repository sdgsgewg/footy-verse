import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { NationalityDetailResponse } from "@/types/nationality";

export function useNationalityActions() {
  const router = useRouter();

  const handleView = (nation: NationalityDetailResponse) => {
    router.push(`${ROUTES.DASHBOARD.CONTENT.NATIONALITIES}/${nation.slug}`);
  };

  return {
    handleView,
  };
}
