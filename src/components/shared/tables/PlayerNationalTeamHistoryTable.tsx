"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/lib/utils/date";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import DataTable from "@/components/shared/DataTable";
import { useParams } from "next/navigation";
import { usePlayerNationalTeamActions } from "@/hooks/dashboard/player-national-teams/usePlayerNationalTeamActions";
import { CrudActionRow } from "@/components/templates/crud";
import { PlayerNationalTeamListItem } from "@/types/player-national-teams";

interface Props {
  playerNationalTeams: PlayerNationalTeamListItem[];
  showActions?: boolean;
}

const PlayerNationalTeamHistoryTable = ({
  playerNationalTeams,
  showActions = false,
}: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const locale = useLocale();

  const { handleView, handleEdit, handleDelete } =
    usePlayerNationalTeamActions(playerSlug);

  return (
    <DataTable
      empty={playerNationalTeams.length === 0}
      emptyMessage="No national team history found."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">National Team</TableHead>
            <TableHead className="w-37.5">Shirt Number</TableHead>
            <TableHead className="w-37.5">Start</TableHead>
            <TableHead className="w-37.5">End</TableHead>

            {showActions && <TableHead className="w-37.5">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {playerNationalTeams.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Image
                    src={getImageUrl(
                      "nationality",
                      STORAGE_BUCKETS.NATIONALITIES,
                      team.nationality.image,
                    )}
                    alt={team.nationality.name}
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                  />

                  <span>{team.nationality.name}</span>
                </div>
              </TableCell>

              <TableCell>{team.shirtNumber}</TableCell>

              <TableCell>{formatDate(team.startDate, locale)}</TableCell>

              <TableCell>
                {team.endDate ? formatDate(team.endDate, locale) : "Present"}
              </TableCell>

              {showActions && (
                <TableCell>
                  <CrudActionRow
                    item={team}
                    onView={() => handleView(team.id)}
                    onEdit={() => handleEdit(team.id)}
                    onDelete={() => handleDelete(team)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTable>
  );
};

export default PlayerNationalTeamHistoryTable;
