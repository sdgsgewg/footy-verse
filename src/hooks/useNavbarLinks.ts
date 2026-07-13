import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import { useTranslations } from "next-intl";

export function useNavbarLinks() {
  const tNav = useTranslations("navigation");
  const tTeams = useTranslations("navigation.teams");
  const tManage = useTranslations("navigation.manage");

  const navLinks: NavLink[] = [{ name: tNav("home"), path: ROUTES.HOME }];

  const teamLinks: NavLink[] = [
    { name: tTeams("indonesia"), path: ROUTES.TEAMS.INDONESIA },
    { name: tTeams("arsenal"), path: ROUTES.TEAMS.ARSENAL },
  ];

  const manageLinks: NavLink[] = [
    { name: tManage("players"), path: ROUTES.MANAGE.PLAYERS.BASE },
    { name: tManage("clubs"), path: ROUTES.MANAGE.CLUBS.BASE },
    { name: tManage("nationalities"), path: ROUTES.MANAGE.NATIONALITIES },
    { name: tManage("positions"), path: ROUTES.MANAGE.POSITIONS },
    { name: tManage("seasons"), path: ROUTES.MANAGE.SEASONS },
  ];

  return {
    navLinks,
    teamLinks,
    manageLinks,
  };
}
