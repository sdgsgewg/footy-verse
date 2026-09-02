import { Skeleton } from "@/components/ui/skeleton";

interface StatisticProps {
  value: string;
  label: string;
  isLoading?: boolean;
}

const Statistic = ({ value, label, isLoading = false }: StatisticProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5">
      {isLoading ? (
        <Skeleton className="h-9 w-20" />
      ) : (
        <span className="text-2xl font-bold tracking-tight sm:text-3xl">
          {value}
        </span>
      )}

      <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
};

export default Statistic;
