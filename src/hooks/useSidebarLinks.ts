import { KeyRound, LayoutDashboard, User } from "lucide-react";

import { useTranslations } from "next-intl";

import { ROUTES } from "@/constants/routes";
import { DASHBOARD_CONTENT_ITEMS } from "@/constants/dashboard-navigation";

import { NavLink } from "@/types/NavLink";

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

  const contentManageLinks: NavLink[] = DASHBOARD_CONTENT_ITEMS.map((item) => ({
    name: tNav(`content.${item.key}`),
    path: item.href,
    icon: item.icon,
  }));

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
