import { useNavbarLinks } from "@/hooks/useNavbarLinks";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import DropdownMenu from "./DropdownMenu";

interface NavbarDesktopLinksProps {
  pathname: string;
  canManage: boolean;
}

const NavbarDesktopLinks = ({
  pathname,
  canManage,
}: NavbarDesktopLinksProps) => {
  const { navLinks, teamLinks, manageLinks } = useNavbarLinks();

  const tTeams = useTranslations("navigation.teams");
  const tManage = useTranslations("navigation.manage");

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive(link.path) ? "text-primary" : "text-muted-foreground",
          )}
        >
          {link.name}
        </Link>
      ))}

      <DropdownMenu
        label={tTeams("base")}
        links={teamLinks}
        pathname={pathname}
      />

      {canManage && (
        <DropdownMenu
          label={tManage("base")}
          links={manageLinks}
          pathname={pathname}
        />
      )}
    </div>
  );
};

export default NavbarDesktopLinks;
