import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const FootballPitchBase = ({ children }: Props) => {
  return (
    <div
      className={cn(
        "relative aspect-3/4 w-full",
        "overflow-hidden rounded-xl border bg-emerald-700",
        "shadow-sm",
      )}
    >
      {/* Outer pitch line */}
      <div className="absolute inset-3 border-2 border-white/80" />

      {/* Halfway line */}
      <div className="absolute top-1/2 right-3 left-3 h-0.5 -translate-y-1/2 bg-white/80" />

      {/* Centre circle */}
      <div
        className="
          absolute top-1/2 left-1/2
          size-20
          -translate-x-1/2 -translate-y-1/2
          rounded-full border-2 border-white/80
        "
      />

      {/* Centre spot */}
      <div
        className="
          absolute top-1/2 left-1/2
          size-2
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-white/80
        "
      />

      {/* Top penalty area */}
      <div
        className="
          absolute top-3 left-1/2
          h-[18%] w-[55%]
          -translate-x-1/2
          border-x-2 border-b-2 border-white/80
        "
      />

      {/* Top goal area */}
      <div
        className="
          absolute top-3 left-1/2
          h-[8%] w-[28%]
          -translate-x-1/2
          border-x-2 border-b-2 border-white/80
        "
      />

      {/* Bottom penalty area */}
      <div
        className="
          absolute bottom-3 left-1/2
          h-[18%] w-[55%]
          -translate-x-1/2
          border-x-2 border-t-2 border-white/80
        "
      />

      {/* Bottom goal area */}
      <div
        className="
          absolute bottom-3 left-1/2
          h-[8%] w-[28%]
          -translate-x-1/2
          border-x-2 border-t-2 border-white/80
        "
      />

      {/* Content */}
      {children}
    </div>
  );
};

export default FootballPitchBase;
