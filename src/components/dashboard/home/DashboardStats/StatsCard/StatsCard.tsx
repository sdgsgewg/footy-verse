import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
