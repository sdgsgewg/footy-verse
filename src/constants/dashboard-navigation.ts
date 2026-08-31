import { Flag, Goal, Map, Network, Shield, Trophy, Users } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export const DASHBOARD_CONTENT_ITEMS = [
  {
    key: "players",
    href: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,
    icon: Users,
  },
  {
    key: "clubs",
    href: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,
    icon: Shield,
  },
  {
    key: "nationalities",
    href: ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE,
    icon: Flag,
  },
  {
    key: "positions",
    href: ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE,
    icon: Goal,
  },
  {
    key: "regions",
    href: ROUTES.DASHBOARD.CONTENT.REGIONS.BASE,
    icon: Map,
  },
  {
    key: "confederations",
    href: ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE,
    icon: Network,
  },
  {
    key: "competitions",
    href: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,
    icon: Trophy,
  },
] as const;
