import { Skeleton } from "@/components/ui/skeleton";
import EntitySummaryLayout from "@/components/shared/summary/EntitySummaryLayout";

const NationalTeamSummarySkeleton = () => {
  return (
    <EntitySummaryLayout
      title={<Skeleton className="h-10 w-64" />}
      image={<Skeleton className="h-40 w-40 rounded-lg" />}
      information={
        <div className="grid grid-cols-3 gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      }
      side={null}
      footer={
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>
      }
    />
  );
};

export default NationalTeamSummarySkeleton;
