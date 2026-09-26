import {
  ConfederationImageLabel,
  NationalityImageLabel,
  RegionImageLabel,
} from "@/components/shared/tables/cells";
import { NationalityListItem } from "@/types/nationality";
import { DataColumn } from "@/types/table";

export type NationalityColumnKey =
  | "name"
  | "fifaCode"
  | "region"
  | "confederation";

type NationalityColumnLabels = {
  name: string;
  fifaCode: string;
  region: string;
  confederation: string;
};

export function createNationalityColumns(
  labels: NationalityColumnLabels,
  visibleColumns?: NationalityColumnKey[],
): DataColumn<NationalityListItem>[] {
  const columns: Record<
    NationalityColumnKey,
    DataColumn<NationalityListItem>
  > = {
    name: {
      key: "name",
      label: labels.name,

      render: (nationality) => (
        <NationalityImageLabel
          imageUrl={nationality.imageUrl}
          label={nationality.name}
        />
      ),
    },

    fifaCode: {
      key: "fifaCode",
      label: labels.fifaCode,
      sortable: true,

      render: (nationality) => nationality.fifaCode,
    },

    confederation: {
      key: "confederation",
      label: labels.confederation,

      render: (nationality) =>
        nationality.confederation ? (
          <ConfederationImageLabel
            imageUrl={nationality.confederation.imageUrl}
            label={nationality.confederation.name}
          />
        ) : (
          "-"
        ),
    },

    region: {
      key: "region",
      label: labels.region,

      render: (nationality) =>
        nationality.region ? (
          <RegionImageLabel
            imageUrl={nationality.region.imageUrl}
            label={nationality.region.name}
          />
        ) : (
          "-"
        ),
    },
  };

  const defaultColumns: NationalityColumnKey[] = [
    "name",
    "fifaCode",
    "confederation",
    "region",
  ];

  const selectedColumns = visibleColumns ?? defaultColumns;

  return selectedColumns.map((columnKey) => columns[columnKey]);
}
