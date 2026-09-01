import { Flag, Goal, Map, Network, Shield, Trophy, Users } from "lucide-react";

import { ENTITY_CONFIG } from "@/config/entities";

export const DASHBOARD_CONTENT_ITEMS = [
  {
    key: "players",
    href: ENTITY_CONFIG["player"]["dashboardRoute"],
    icon: Users,
  },
  {
    key: "clubs",
    href: ENTITY_CONFIG["club"]["dashboardRoute"],
    icon: Shield,
  },
  {
    key: "nationalities",
    href: ENTITY_CONFIG["nationality"]["dashboardRoute"],
    icon: Flag,
  },
  {
    key: "positions",
    href: ENTITY_CONFIG["position"]["dashboardRoute"],
    icon: Goal,
  },
  {
    key: "regions",
    href: ENTITY_CONFIG["region"]["dashboardRoute"],
    icon: Map,
  },
  {
    key: "confederations",
    href: ENTITY_CONFIG["confederation"]["dashboardRoute"],
    icon: Network,
  },
  {
    key: "competitions",
    href: ENTITY_CONFIG["competition"]["dashboardRoute"],
    icon: Trophy,
  },
] as const;
