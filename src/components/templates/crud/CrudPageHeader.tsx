import { Database } from "lucide-react";

export const CrudPageHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3 pb-6 border-b border-border/40">
      <div className="p-2.5 bg-primary/10 rounded-xl">
        <Database className="w-6 h-6 text-primary" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
        {title}
      </h1>
    </div>
  );
};
