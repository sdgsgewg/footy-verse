import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import { useTranslations } from "next-intl";

export function useNavLinks() {
  const tNav = useTranslations("navigation");

  const navLinks: NavLink[] = [
    { name: tNav("home"), path: ROUTES.HOME },
    { name: tNav("teams.base"), path: ROUTES.TEAMS.BASE },
  ];

  return {
    navLinks,
  };
}
