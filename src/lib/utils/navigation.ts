import { ROUTES } from "@/constants/routes";

export function isActivePath(pathname: string, path: string, exact = false) {
  if (exact) {
    return pathname === path;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

export function isDashboardPath(pathname: string) {
  return pathname.includes(ROUTES.DASHBOARD.BASE)
}