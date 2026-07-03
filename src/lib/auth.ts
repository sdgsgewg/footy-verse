import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function requireRole(roles: string[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !roles.includes(profile.role)) {
    redirect("/");
  }

  return {
    user,
    profile,
  };
}
