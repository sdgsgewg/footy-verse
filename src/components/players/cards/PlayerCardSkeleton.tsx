import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlayerCardSkeleton() {
  return (
    <Card className="flex h-90 flex-col gap-0 overflow-hidden py-0">
      {/* Player Image */}
      <Skeleton className="h-52 w-full shrink-0 rounded-none" />

      <CardContent className="flex min-h-0 flex-1 flex-col space-y-4 p-4">
        {/* Player Name and Shirt Number */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />

            <Skeleton className="h-7 w-32" />
          </div>

          <Skeleton className="h-12 w-12" />
        </div>

        {/* Position and Team/Nationality */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-6 rounded-sm" />

            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
