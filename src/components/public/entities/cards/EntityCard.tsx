import { ChevronRight } from "lucide-react";
import { useRouter } from "@/navigation";
import { Card, CardContent } from "@/components/ui/card";
import ImageWrapper from "@/components/shared/ImageWrapper";
import { EntityItem } from "@/types/entity";
import { cn } from "@/lib/utils";

interface Props {
  entity: EntityItem;
}

export default function EntityCard({ entity }: Props) {
  const router = useRouter();

  const { name, imageUrl, href, subtitle, type } = entity;

  const navigateToEntityDetailPage = () => {
    router.push(href ?? "");
  };

  const isPlayer = type === "player";

  const isNationality = type === "nationality";

  const getImageClassName = () => {
    switch (type) {
      case "player":
        return "object-cover rounded-full";
        break;
      case "nationality":
        return "object-cover rounded-sm";
        break;
      case "competition":
        return "object-contain rounded-full";
        break;
      default:
        return "object-contain";
        break;
    }
  };

  return (
    <Card
      onClick={navigateToEntityDetailPage}
      className="group flex transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <CardContent className="flex flex-col items-center text-center gap-4">
        <div
          className={cn(
            isNationality ? "h-20 w-26 rounded-sm" : "h-20 w-20 rounded-full",
            "relative overflow-hidden border bg-muted p-2",
          )}
        >
          {imageUrl ? (
            <ImageWrapper
              src={imageUrl}
              alt={name}
              className={{
                container: "h-full w-full",
                image: cn(
                  getImageClassName(),
                  "transition-transform duration-500 group-hover:scale-105",
                ),
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              Logo
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold truncate">{name}</h3>

          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </CardContent>
    </Card>
  );
}
