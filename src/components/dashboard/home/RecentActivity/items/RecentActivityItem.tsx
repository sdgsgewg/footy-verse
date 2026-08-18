import { Activity } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ActivityLogListItem } from "@/types/activity-log";

interface RecentActivityItemProps {
  activity: ActivityLogListItem;
  showSeparator?: boolean;
}

export default function RecentActivityItem({
  activity,
  showSeparator = true,
}: RecentActivityItemProps) {
  const { title, time, description, entity } = activity;

  return (
    <>
      <div className="flex gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
          <Activity className="size-4 text-muted-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">{title}</p>

            <span className="text-xs text-muted-foreground">{time}</span>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>

          <Badge variant="secondary" className="mt-2">
            {entity}
          </Badge>
        </div>
      </div>

      {showSeparator && <Separator />}
    </>
  );
}
