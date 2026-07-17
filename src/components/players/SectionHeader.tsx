import React from "react";

interface Props {
  title: string;
}

const SectionHeader = ({ title }: Props) => {
  return (
    <div className="bg-primary text-primary-foreground text-xl font-bold px-4 py-2 uppercase mb-1">
      <p className="text-start">{title}</p>
    </div>
  );
};

export default SectionHeader;
