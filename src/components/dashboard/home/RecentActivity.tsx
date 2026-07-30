import React from "react";
import { Activity, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const recentActivities = [
  {
    title: "New player added",
    description: "A new player was added to the database.",
    time: "5 minutes ago",
    status: "Player",
  },
  {
    title: "Club information updated",
    description: "Club profile and team information were updated.",
    time: "1 hour ago",
    status: "Club",
  },
  {
    title: "Position created",
    description: "A new football position was added.",
    time: "3 hours ago",
    status: "Position",
  },
  {
    title: "Nationality updated",
    description: "Country information was updated.",
    time: "Yesterday",
    status: "Nationality",
  },
];

export default function RecentActivity() {
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

      <CardContent>
        <div className="space-y-5">
          {recentActivities.map((activity, index) => (
            <React.Fragment key={activity.title}>
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Activity className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">{activity.title}</p>

                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                  </p>

                  <Badge variant="secondary" className="mt-2">
                    {activity.status}
                  </Badge>
                </div>
              </div>

              {index < recentActivities.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
