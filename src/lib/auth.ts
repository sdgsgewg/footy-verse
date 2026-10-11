import { redirect } from "@/navigation";
import { getLocale } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";

export async function requireRole(roles: string[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const locale = await getLocale();
    redirect({ href: "/login", locale });
    return null as never;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !roles.includes(profile.role)) {
    const locale = await getLocale();
    redirect({ href: "/", locale });
    return null as never;
  }

  return {
    user,
    profile,
  };
}
