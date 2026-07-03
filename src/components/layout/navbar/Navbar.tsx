"use client";

import { LanguageSwitcher } from "@/components/settings/LanguageSwitcher";
import { ModeToggle } from "@/components/settings/ModeToggle";
import { ROUTES } from "@/constants/routes";
import useFixedNavbar from "@/hooks/useFixedNavbar";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/navigation";
import { type NavLink } from "@/types/NavLink";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import MobileDropdownMenu from "./MobileDropdownMenu";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/enums/Role";

const Navbar = () => {
  const tNav = useTranslations("navigation");
  const tTeams = useTranslations("navigation.teams");
  const tManage = useTranslations("navigation.manage");
  const tCommonAuth = useTranslations("common.auth");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, profile, loading } = useAuth();

  const canManage =
    profile?.role === Role.ADMIN || profile?.role === Role.EDITOR;

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  useFixedNavbar();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const navLinks: NavLink[] = [{ name: tNav("home"), path: ROUTES.HOME }];

  const teamLinks: NavLink[] = [
    { name: tTeams("indonesia"), path: ROUTES.TEAMS.INDONESIA },
    { name: tTeams("arsenal"), path: ROUTES.TEAMS.ARSENAL },
  ];

  const manageLinks: NavLink[] = [
    { name: tManage("players"), path: ROUTES.MANAGE.PLAYERS },
    { name: tManage("clubs"), path: ROUTES.MANAGE.CLUBS },
    { name: tManage("nationalities"), path: ROUTES.MANAGE.NATIONALITIES },
    { name: tManage("positions"), path: ROUTES.MANAGE.POSITIONS },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header>
      <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center px-4 container mx-auto justify-between">
          <div className="flex items-center">
            {/* Logo and Website Name */}
            <div className="flex items-center">
              <div
                className="rounded-md shadow-md flex justify-center overflow-hidden"
                style={{ width: "100%", height: "30px" }}
              >
                <Image
                  src="https://wmghprjdobvoxthkdlnh.supabase.co/storage/v1/object/public/common/teams.png"
                  alt="Teams"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <Link
                href={ROUTES.HOME}
                className="font-bold text-lg text-primary block ms-3"
              >
                FootyVerse
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground",
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
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher />
            <ModeToggle />

            {/* Desktop Auth Section */}
            {!loading &&
              (user ? (
                <div className="hidden md:flex items-center gap-3">
                  <span
                    className="text-xs text-muted-foreground max-w-30 truncate"
                    title={user.email}
                  >
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border border-border/50 bg-muted/40 hover:bg-muted transition-all cursor-pointer text-foreground"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{tCommonAuth("logout")}</span>
                  </button>
                </div>
              ) : (
                <Link
                  href={ROUTES.AUTH.LOGIN}
                  className="hidden md:flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{tCommonAuth("login")}</span>
                </Link>
              ))}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-md focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-background border-l shadow-2xl flex flex-col"
          >
            <div className="flex h-16 items-center px-4 justify-between border-b shrink-0">
              <span className="font-bold text-2xl bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                className="p-2 text-foreground hover:bg-muted rounded-md focus:outline-none"
                onClick={closeMobileMenu}
                aria-label="Close Mobile Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={closeMobileMenu}
                    className={cn(
                      "text-lg font-medium transition-colors p-2 rounded-md hover:bg-accent",
                      isActive(link.path)
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <MobileDropdownMenu
                label={tTeams("base")}
                links={teamLinks}
                pathname={pathname}
                onLinkClick={closeMobileMenu}
              />

              {canManage && (
                <MobileDropdownMenu
                  label={tManage("base")}
                  links={manageLinks}
                  pathname={pathname}
                  onLinkClick={closeMobileMenu}
                />
              )}

              {/* Mobile Auth section */}
              <div className="pt-6 border-t border-border/50 space-y-3">
                {!loading &&
                  (user ? (
                    <div className="space-y-3 p-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground truncate">
                          {user.email}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          handleSignOut();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{tCommonAuth("logout")}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="px-2">
                      <Link
                        href={ROUTES.AUTH.LOGIN}
                        onClick={closeMobileMenu}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>{tCommonAuth("login")}</span>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
