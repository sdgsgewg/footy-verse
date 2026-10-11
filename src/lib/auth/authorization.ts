import { redirect } from "@/navigation";
import { getLocale } from "next-intl/server";

import { getCurrentProfile } from "./current-auth";
import { canManageContent, canManageSystem } from "./roles";

export async function requireManageContent() {
  const profile = await getCurrentProfile();

  if (!canManageContent(profile)) {
    const locale = await getLocale();
    redirect({ href: "/", locale });
    return null as never;
  }

  return profile;
}

export async function requireManageSystem() {
  const profile = await getCurrentProfile();

  if (!canManageSystem(profile)) {
    const locale = await getLocale();
    redirect({ href: "/", locale });
    return null as never;
  }

  return profile;
}

export async function requireAdmin() {}
