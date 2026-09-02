import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  title: string;
  onAdd?: () => void;
}

const SubsectionHeader = ({ title, onAdd }: Props) => {
  const tCommonActions = useTranslations("common.actions");

  return (
    <div className="flex items-center justify-between bg-foreground/60 px-4 py-1 uppercase mb-1">
      <p className="text-start text-primary-foreground text-lg font-semibold">
        {title}
      </p>

      {onAdd && (
        <Button
          variant="default"
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

export default SubsectionHeader;
