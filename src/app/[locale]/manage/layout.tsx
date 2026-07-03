import { requireRole } from "@/lib/auth";

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["ADMIN", "EDITOR"]);

  return children;
}
