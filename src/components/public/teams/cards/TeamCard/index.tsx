import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { TeamItem } from "@/types/team";
import { useRouter } from "@/navigation";

interface Props {
  team: TeamItem;
}

export default function TeamCard({ team }: Props) {
  const router = useRouter();

  const navigateToTeamDetailPage = () => {
    router.push(team.href ? team.href : "");
  };

  const content = (
    <div className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg cursor-pointer">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border bg-muted">
          {team.imageUrl ? (
            <Image
              src={team.imageUrl}
              alt={team.name}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              Logo
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold">{team.name}</h3>

          {team.subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">
              {team.subtitle}
            </p>
          )}
        </div>

        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (team.href) {
    return <div onClick={navigateToTeamDetailPage}>{content}</div>;
  }

  return content;
}
