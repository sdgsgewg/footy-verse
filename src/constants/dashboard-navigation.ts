import { ENTITY_CONFIG } from "@/config/entities";

export const DASHBOARD_CONTENT_ITEMS = [
  {
    key: ENTITY_CONFIG["player"]["table"],
    href: ENTITY_CONFIG["player"]["dashboardRoute"],
    icon: ENTITY_CONFIG["player"]["icon"],
  },
  {
    key: ENTITY_CONFIG["club"]["table"],
    href: ENTITY_CONFIG["club"]["dashboardRoute"],
    icon: ENTITY_CONFIG["club"]["icon"],
  },
  {
    key: ENTITY_CONFIG["nationality"]["table"],
    href: ENTITY_CONFIG["nationality"]["dashboardRoute"],
    icon: ENTITY_CONFIG["nationality"]["icon"],
  },
  {
    key: ENTITY_CONFIG["position"]["table"],
    href: ENTITY_CONFIG["position"]["dashboardRoute"],
    icon: ENTITY_CONFIG["position"]["icon"],
  },
  {
    key: ENTITY_CONFIG["region"]["table"],
    href: ENTITY_CONFIG["region"]["dashboardRoute"],
    icon: ENTITY_CONFIG["region"]["icon"],
  },
  {
    key: ENTITY_CONFIG["confederation"]["table"],
    href: ENTITY_CONFIG["confederation"]["dashboardRoute"],
    icon: ENTITY_CONFIG["confederation"]["icon"],
  },
  {
    key: ENTITY_CONFIG["competition"]["table"],
    href: ENTITY_CONFIG["competition"]["dashboardRoute"],
    icon: ENTITY_CONFIG["competition"]["icon"],
  },
] as const;
