import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: ReactNode;
  image: ReactNode;
  information: ReactNode;

  side?: ReactNode;
  footer?: ReactNode;

  className?: {
    root?: string;
    left?: string;
    right?: string;
  };
}

const EntitySummaryLayout = ({
  title,
  image,
  information,
  side,
  footer,
  className,
}: Props) => {
  return (
    <Card className={className?.root}>
      <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        {/* Left */}
        <div
          className={[
            "flex flex-col items-start justify-between gap-6",
            className?.left,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title}

          {image}

          {information}
        </div>

        {/* Right */}
        <div
          className={["flex flex-col gap-8 md:items-end", className?.right]
            .filter(Boolean)
            .join(" ")}
        >
          {side}

          {footer && (
            <div className="mt-auto flex w-full sm:justify-end">{footer}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EntitySummaryLayout;
