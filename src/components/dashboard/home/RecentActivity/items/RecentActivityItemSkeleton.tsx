import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentActivityItemSkeletonProps {
  showSeparator?: boolean;
}

export default function RecentActivityItemSkeleton({
  showSeparator = true,
}: RecentActivityItemSkeletonProps) {
  return (
    <>
      <div className="flex gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>

          <Skeleton className="mt-2 h-4 w-3/4" />

          <Skeleton className="mt-2 h-5 w-20 rounded-md" />
        </div>
      </div>

      {showSeparator && <Separator />}
    </>
  );
}
