import { cn } from "@/lib/utils";

interface Props {
  label: string;
  title: string;
  x: number;
  y: number;
  isMain?: boolean;
}

const PositionMarker = ({ label, title, x, y, isMain = false }: Props) => {
  return (
    <div
      className={cn(
        "absolute z-10 flex -translate-x-1/2 -translate-y-1/2",
        "items-center justify-center rounded-full",
        "font-bold shadow-md transition-transform",
        "hover:scale-110",
        isMain
          ? "size-11 xl:size-10 border-2 border-primary-foreground bg-primary text-primary-foreground"
          : "size-9 xl:size-8 border-2 border-primary bg-background text-primary",
      )}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      title={title}
      aria-label={title}
    >
      <span className={cn("leading-none", isMain ? "text-sm" : "text-xs")}>
        {label}
      </span>
    </div>
  );
};
export default PositionMarker;
