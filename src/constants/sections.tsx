import { HeroSection } from "@/components/home";

interface Section {
  name: string;
  element: React.ReactElement;
}

export const homeSections: Section[] = [
  { name: "hero", element: <HeroSection /> },
] as const;

export type HomeSectionName = (typeof homeSections)[number]["name"];
