import { ArrowRight, Database } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import EmptyState from "@/components/feedback/EmptyState";
import { EntityItem } from "@/types/entity";
import { EntityCard, EntityCardSkeleton, EntityCardWrapper } from "./cards";

interface Props {
  items: EntityItem[];

  isLoading?: boolean;
  showAllData?: boolean;

  empty?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  };

  showMore?: {
    visible?: boolean;
    label?: string;
    onClick: () => void;
  };
}

export default function EntityDataSection({
  items,
  isLoading = false,
  showAllData = false,
  empty,
  showMore,
}: Props) {
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const modifiedItems = showAllData ? items : items.slice(0, 10);

  if (isLoading) {
    return (
      <EntityCardWrapper>
        {Array.from({ length: 10 }).map((_, index) => (
          <EntityCardSkeleton key={index} />
        ))}
      </EntityCardWrapper>
    );
  }

  if (items.length === 0 && empty) {
    return (
      <EmptyState
        icon={Database}
        title={empty.title ?? tCommonStates("empty.title")}
        description={empty.description ?? tCommonStates("empty.description")}
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Grid */}
      <EntityCardWrapper>
        {modifiedItems.map((item) => (
          <EntityCard key={item.id} entity={item} />
        ))}
      </EntityCardWrapper>

      {/* Show More */}
      {showMore?.visible && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={showMore.onClick}
            className="gap-2"
          >
            {showMore.label ?? tCommonActions("showMore")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
