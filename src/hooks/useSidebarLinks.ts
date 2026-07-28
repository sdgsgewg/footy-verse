import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import {
  CalendarRange,
  Globe,
  Globe2,
  KeyRound,
  LayoutDashboard,
  MapPinned,
  Shield,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function useSidebarLinks() {
  const tNav = useTranslations("navigation.dashboard");

  const navLinks: NavLink[] = [
    {
      name: tNav("base"),
      path: ROUTES.DASHBOARD.BASE,
      icon: LayoutDashboard,
      exact: true,
    },
  ];

  const contentManageLinks: NavLink[] = [
    {
      name: tNav("content.players"),
      path: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,
      icon: Users,
    },
    {
      name: tNav("content.clubs"),
      path: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,
      icon: Shield,
    },
    {
      name: tNav("content.nationalities"),
      path: ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE,
      icon: Globe,
    },
    {
      name: tNav("content.positions"),
      path: ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE,
      icon: MapPinned,
    },
    {
      name: tNav("content.seasons"),
      path: ROUTES.DASHBOARD.CONTENT.SEASONS.BASE,
      icon: CalendarRange,
    },
    {
      name: tNav("content.regions"),
      path: ROUTES.DASHBOARD.CONTENT.REGIONS.BASE,
      icon: Globe2,
    },
    {
      name: tNav("content.competitions"),
      path: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,
      icon: Trophy,
    },
  ];

  const systemManageLinks: NavLink[] = [
    {
      name: tNav("system.users"),
      path: ROUTES.DASHBOARD.SYSTEM.USERS.BASE,
      icon: User,
    },
    {
      name: tNav("system.roles"),
      path: ROUTES.DASHBOARD.SYSTEM.ROLES.BASE,
      icon: KeyRound,
    },
  ];

  return {
    navLinks,
    contentManageLinks,
    systemManageLinks,
  };
}
