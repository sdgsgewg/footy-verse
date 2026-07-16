import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import { useTranslations } from "next-intl";

export function useNavbarLinks() {
  const tNav = useTranslations("navigation");
  const tTeams = useTranslations("navigation.teams");
  const tManage = useTranslations("navigation.manage");

  const navLinks: NavLink[] = [
    { name: tNav("home"), path: ROUTES.HOME },
    { name: tNav("teams.base"), path: ROUTES.TEAMS.BASE },
  ];

  const teamLinks: NavLink[] = [
    { name: tTeams("indonesia"), path: ROUTES.TEAMS.INDONESIA },
    { name: tTeams("arsenal"), path: ROUTES.TEAMS.ARSENAL },
  ];

  return {
    navLinks,
    teamLinks,
  };
}
