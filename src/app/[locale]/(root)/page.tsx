"use client";

import { Section } from "@/components/public/home/Section";
import { homeSections } from "@/constants/sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {homeSections.map(({ name, element }, index) => (
        <Section key={name} sectionName={name} isOdd={index % 2 !== 0}>
          {element}
        </Section>
      ))}
    </div>
  );
}
