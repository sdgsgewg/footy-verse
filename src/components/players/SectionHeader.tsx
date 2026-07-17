import React from "react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  onAdd?: () => void;
}

const SectionHeader = ({ title, onAdd }: Props) => {
  return (
    <div className="bg-primary text-primary-foreground text-xl font-bold px-4 py-2 uppercase mb-1">
      <p className="text-start">{title}</p>
      {onAdd && <Button onClick={onAdd} />}
    </div>
  );
};

export default SectionHeader;
