"use client";

import { HomeSectionName } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import React, { createContext, useContext } from "react";

interface SectionContextValue {
  sectionName: HomeSectionName;
  isOdd: boolean;
}

const SectionContext = createContext<SectionContextValue | undefined>(
  undefined,
);

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionContext must be used within a Section");
  }
  return context;
};

interface ISectionProps {
  children: React.ReactNode;
}

export interface CenteredContentSectionProps extends ISectionProps {
  title: string;
  subtitle: string | React.ReactNode;
  ctaText?: string;
  onClickCTA?: () => void;
}

export interface SideBySideContentSectionProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

interface SectionProps extends ISectionProps {
  sectionName: HomeSectionName;
  isOdd: boolean;
}

export const CenteredContentSection: React.FC<CenteredContentSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onClickCTA,
  children,
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-12 max-w-2xl text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <span className="text-base text-muted-foreground">{subtitle}</span>
      </div>

      {children}

      {ctaText && (
        <div
          className="flex items-center justify-center gap-1 text-primary text-base font-semibold mt-8 sm:mt-16 cursor-pointer hover:underline"
          onClick={onClickCTA}
        >
          <Link size={16} />
          <p>{ctaText}</p>
        </div>
      )}
    </div>
  );
};

export const SideBySideContentSection: React.FC<
  SideBySideContentSectionProps
> = ({ left, right }) => {
  const { sectionName } = useSectionContext();

  const customClassName =
    sectionName === "hero"
      ? "flex-col-reverse gap-4 items-center"
      : sectionName === "cta"
        ? "flex-col gap-8 items-center"
        : sectionName === "leaderboard"
          ? "flex-col gap-12 items-center"
          : sectionName === "stats"
            ? "flex-col gap-8 md:gap-12 items-stretch"
            : "";

  return (
    <section
      className={`container w-full mx-auto flex ${customClassName} lg:flex-row justify-between lg:gap-20`}
    >
      {left}
      {right}
    </section>
  );
};

export const Section: React.FC<SectionProps> = ({
  sectionName,
  isOdd,
  children,
}) => {
  const isHero = sectionName === "hero";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16",
        isHero && "lg:py-20",
        isOdd ? "bg-muted/50" : "bg-background",
      )}
    >
      <SectionContext.Provider value={{ sectionName, isOdd }}>
        {children}
      </SectionContext.Provider>
    </section>
  );
};
