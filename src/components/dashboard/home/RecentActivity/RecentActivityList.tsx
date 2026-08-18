import { ActivityLogListItem } from "@/types/activity-log";
import {
  RecentActivityItem,
  RecentActivityItemSkeleton,
  RecentActivityItemWrapper,
} from "./items";
import ErrorState from "@/components/feedback/ErrorState";
import EmptyState from "@/components/feedback/EmptyState";
import { Activity } from "lucide-react";

interface Props {
  activityLogs: ActivityLogListItem[];

  isLoading: boolean;

  error?: Error | null;

  onRetry?: () => void;
}

export default function RecentActivityList({
  activityLogs,
  isLoading,
  error,
  onRetry,
}: Props) {
  if (isLoading) {
    return (
      <RecentActivityItemWrapper>
        {Array.from({ length: 5 }).map((_, index) => (
          <RecentActivityItemSkeleton key={index} showSeparator={index < 4} />
        ))}
      </RecentActivityItemWrapper>
    );
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (activityLogs.length === 0) {
    return (
      <EmptyState
        icon={Activity}
        title="No activity log found"
        description="There are no activity log."
      />
    );
  }

  return (
    <RecentActivityItemWrapper>
      {activityLogs.map((activity, index) => (
        <RecentActivityItem
          key={activity.id}
          activity={activity}
          showSeparator={index < activityLogs.length - 1}
        />
      ))}
    </RecentActivityItemWrapper>
  );
}
