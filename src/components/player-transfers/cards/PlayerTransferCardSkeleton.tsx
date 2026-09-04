import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PlayerTransferCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>

          <Skeleton className="h-6 w-16" />
        </div>

        {/* Player */}
        <div className="my-5 flex flex-col items-center">
          <Skeleton className="size-20 rounded-full" />

          <Skeleton className="mt-3 h-5 w-24" />
        </div>

        {/* Transfer */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
          {/* From Club */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="size-12" />

            <Skeleton className="h-3 w-20" />
          </div>

          {/* Arrow */}
          <div className="flex h-12 items-center">
            <Skeleton className="size-5 rounded-full" />
          </div>

          {/* To Club */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="size-12" />

            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Date */}
        <div className="mt-5 flex justify-center border-t pt-4">
          <Skeleton className="h-3 w-24" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerTransferCardSkeleton;
