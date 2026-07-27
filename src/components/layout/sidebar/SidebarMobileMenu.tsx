import { useSidebarLinks } from "@/hooks/useSidebarLinks";
import { useTranslations } from "next-intl";
import NavbarMobileSheet from "../navbar/mobile/NavbarMobileSheet";
import MobileNavLinks from "../navbar/mobile/MobileNavLinks";
import MobileDropdownMenu from "../navbar/mobile/MobileDropdownMenu";

interface SidebarMobileMenuProps {
  open: boolean;
  pathname: string;
  isContentManager: boolean;
  isSystemManager: boolean;
  onClose: () => void;
}

const SidebarMobileMenu = ({
  open,
  pathname,
  isContentManager,
  isSystemManager,
  onClose,
}: SidebarMobileMenuProps) => {
  const tNav = useTranslations("navigation");

  const { navLinks, contentManageLinks, systemManageLinks } = useSidebarLinks();

  return (
    <NavbarMobileSheet open={open} onClose={onClose}>
      <MobileNavLinks
        links={navLinks}
        pathname={pathname}
        onLinkClick={onClose}
      />

      {isContentManager && (
        <MobileDropdownMenu
          label={tNav("dashboard.content.base")}
          links={contentManageLinks}
          pathname={pathname}
          onLinkClick={onClose}
        />
      )}

      {/* {isSystemManager && (
        <MobileDropdownMenu
          label={tNav("dashboard.system.base")}
          links={systemManageLinks}
          pathname={pathname}
          onLinkClick={onClose}
        />
      )} */}
    </NavbarMobileSheet>
  );
};

export default SidebarMobileMenu;
