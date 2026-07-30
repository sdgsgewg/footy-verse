import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SystemOverviewProps {
  totalRecords: number;
  isLoading?: boolean;
}

export default function SystemOverview({
  totalRecords,
  isLoading = false,
}: SystemOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Overview</CardTitle>

        <CardDescription>
          Current status of the Footy Verse database.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Database Status</p>

            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />

              <span className="font-semibold">Operational</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Last Updated</p>

            <p className="font-semibold">Just now</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Records</p>

            {isLoading ? (
              <Skeleton className="h-5 w-28" />
            ) : (
              <p className="font-semibold">
                {totalRecords.toLocaleString()} records
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
