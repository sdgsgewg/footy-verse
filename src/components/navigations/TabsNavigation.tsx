"use client";

import { Link, usePathname } from "@/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TabNavigationItem {
  value: string;
  label: string;
  href: string;

  /**
   * Default:
   * pathname === href
   */
  isActive?: (pathname: string) => boolean;
}

interface TabsNavigationProps {
  items: TabNavigationItem[];
}

export default function TabsNavigation({ items }: TabsNavigationProps) {
  const pathname = usePathname();

  const activeItem =
    items.find((item) =>
      item.isActive ? item.isActive(pathname) : pathname === item.href,
    ) ?? items[0];

  return (
    <Tabs value={activeItem.value}>
      <TabsList>
        {items.map((item) => {
          const active = item.isActive
            ? item.isActive(pathname)
            : pathname === item.href;

          return (
            <TabsTrigger key={item.value} value={item.value} asChild>
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
