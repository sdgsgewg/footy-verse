import { Link } from "@/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavbarMobileAuth from "../mobile/NavbarMobileAuth";
import { useNavLinks } from "@/hooks/useNavLinks";

interface NavbarMobileMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

const NavbarMobileMenu = ({
  open,
  pathname,
  onClose,
}: NavbarMobileMenuProps) => {
  const { navLinks } = useNavLinks();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-background border-l shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex h-16 items-center px-4 justify-between border-b shrink-0">
              <span className="font-bold text-2xl bg-linear-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
                Menu
              </span>

              <button
                className="p-2 text-foreground hover:bg-muted rounded-md focus:outline-none cursor-pointer"
                onClick={onClose}
                aria-label="Close Mobile Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const active = isActive(link.path);

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={onClose}
                      className={cn(
                        "rounded-md p-2 text-lg font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth section */}
              <NavbarMobileAuth onClose={onClose} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarMobileMenu;
