"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActivityLogs } from "@/hooks/dashboard/activity-logs";
import useActivityLogFilter from "@/hooks/dashboard/activity-logs/useActivityLogFilter";
import RecentActivityList from "./RecentActivityList";

export default function RecentActivity() {
  const { debouncedFilters } = useActivityLogFilter();

  const { activityLogs, loading, loadError, retryLoad } = useActivityLogs({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>

            <CardDescription className="mt-1">
              Latest changes in the system.
            </CardDescription>
          </div>

          <Button variant="ghost" size="sm">
            View all
            <ArrowUpRight className="ml-1 size-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="lg:max-h-84 lg:overflow-y-auto scrollbar-on-hover">
        <RecentActivityList
          activityLogs={activityLogs}
          isLoading={loading}
          error={loadError}
          onRetry={retryLoad}
        />
      </CardContent>
    </Card>
  );
}
