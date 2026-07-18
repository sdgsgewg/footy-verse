import { Skeleton } from "@/components/ui/skeleton";

export default function TeamCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex flex-col items-center gap-4 text-center">
        <Skeleton className="h-20 w-20 rounded-full" />

        <div className="space-y-2 w-full flex flex-col items-center">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="h-4 w-4 rounded" />
      </div>
    </div>
  );
}
