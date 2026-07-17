import React from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

interface Props {
  title: string;
  onAdd?: () => void;
}

const SectionHeader = ({ title, onAdd }: Props) => {
  const tCommonActions = useTranslations("common.actions");

  return (
    <div className="flex items-center justify-between bg-primary   px-4 py-2 uppercase mb-1">
      <p className="text-start text-primary-foreground text-xl font-bold">
        {title}
      </p>
      {onAdd && (
        <Button
          variant="muted"
          size="sm"
          onClick={onAdd}
          className="flex items-center gap-1"
        >
          <Plus />
          {tCommonActions("add")}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
