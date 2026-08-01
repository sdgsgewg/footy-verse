import { ChevronRight } from "lucide-react";
import { TeamItem } from "@/types/team";
import { useRouter } from "@/navigation";
import { Card, CardContent } from "@/components/ui/card";
import ImageWrapper from "@/components/shared/ImageWrapper";

interface Props {
  team: TeamItem;
}

export default function TeamCard({ team }: Props) {
  const router = useRouter();

  const navigateToTeamDetailPage = () => {
    router.push(team.href ? team.href : "");
  };

  return (
    <Card
      onClick={navigateToTeamDetailPage}
      className="group flex transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <CardContent className="flex flex-col items-center text-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border bg-muted p-2">
          {team.imageUrl ? (
            <ImageWrapper
              src={team.imageUrl}
              alt={team.name}
              className={{
                container: "h-full w-full",
                image:
                  "object-contain transition-transform duration-500 group-hover:scale-105",
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              Logo
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold truncate">{team.name}</h3>

          {team.subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">
              {team.subtitle}
            </p>
          )}
        </div>

        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </CardContent>
    </Card>
  );
}
