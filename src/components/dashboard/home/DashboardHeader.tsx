import { Activity } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <p className="mt-1 text-muted-foreground">
          Overview of your Footy Verse management system.
        </p>
      </div>

      <Button>
        <Activity className="mr-2 size-4" />
        View Activity
      </Button>
    </section>
  );
}
