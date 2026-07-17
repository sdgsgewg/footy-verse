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

import { PlayerNationalTeam } from "@/types/player";
import { formatDate } from "@/lib/utils/date";
import { getImageUrl } from "@/lib/images/image-url";
import { getDefaultImage } from "@/lib/images/default-image";
import { STORAGE_BUCKETS } from "@/lib/storage";
import DataTable from "../shared/DataTable";

interface Props {
  nationalTeams: PlayerNationalTeam[];
}

const NationalTeamHistoryTable = ({ nationalTeams }: Props) => {
  const locale = useLocale();

  return (
    <DataTable
      empty={nationalTeams.length === 0}
      emptyMessage="No national team history found."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">National Team</TableHead>
            <TableHead className="w-37.5">Shirt Number</TableHead>
            <TableHead className="w-37.5">Start</TableHead>
            <TableHead className="w-37.5">End</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {nationalTeams.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      getImageUrl(
                        STORAGE_BUCKETS.NATIONALITIES,
                        team.nationality.image,
                      ) ?? getDefaultImage("nationality")
                    }
                    alt={team.nationality.name}
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                  />

                  <span>{team.nationality.name}</span>
                </div>
              </TableCell>

              <TableCell>{team.shirt_number}</TableCell>

              <TableCell>{formatDate(team.start_date, locale)}</TableCell>

              <TableCell>
                {team.end_date ? formatDate(team.end_date, locale) : "Present"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTable>
  );
};

export default NationalTeamHistoryTable;
