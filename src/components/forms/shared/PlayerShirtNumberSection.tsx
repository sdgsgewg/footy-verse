"use client";

import { useTranslations } from "next-intl";
import { Plus, Trash2, Hash } from "lucide-react";

import { DateField, NumberField } from "../fields";
import FormSection from "../base/FormSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { parseDateString } from "@/lib/utils/date";
import { addDays, subDays } from "date-fns";

export interface PlayerShirtNumberSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  namePrefix?: string;
  minItems?: number;
  maxItems?: number;
  entityType?: "nationalTeam" | "clubTeam";
}

export default function PlayerShirtNumberSection({
  form,
  namePrefix,
  minItems = 0,
  maxItems,
  entityType = "nationalTeam",
}: PlayerShirtNumberSectionProps) {
  const namespace =
    entityType === "clubTeam"
      ? "dashboard.playerClubTeamCareers.form"
      : "dashboard.playerNationalTeamCareers.form";

  const tForm = useTranslations(`${namespace}.shirtNumbers`);
  const tLabels = useTranslations(`${namespace}.labels.shirtNumbers`);
  const tPlaceholders = useTranslations(
    `${namespace}.placeholders.shirtNumbers`,
  );
  const tCommonActions = useTranslations("common.actions");

  const arrayFieldName = namePrefix
    ? `${namePrefix}.shirt_numbers`
    : "shirt_numbers";

  const joinedAtFieldName = namePrefix
    ? `${namePrefix}.career.joined_at`
    : "career.joined_at";

  const leftAtFieldName = namePrefix
    ? `${namePrefix}.career.left_at`
    : "career.left_at";

  return (
    <form.Field name={arrayFieldName} mode="array">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(field: any) => {
        const itemCount = field.state.value?.length ?? 0;
        const canAdd = maxItems === undefined || itemCount < maxItems;
        const canRemove = itemCount > minItems;

        const handleAdd = () => {
          field.pushValue({
            shirt_number: null,
            start_date: "",
            end_date: "",
          });
        };

        const title =
          minItems > 0
            ? `${tForm("title")} (min ${minItems})`
            : `${tForm("title")} (optional)`;

        return (
          <FormSection
            title={title}
            action={
              itemCount > 0 && (
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAdd}
                  className="gap-1.5 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  {tCommonActions("add")}
                </Button>
              )
            }
          >
            {itemCount === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/80 bg-muted/20 p-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {tForm("noData")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tForm("instruction")}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAdd}
                  disabled={!canAdd}
                  className="mt-2 gap-1.5 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  {tCommonActions("add")}
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-12 text-center font-semibold">
                        #
                      </TableHead>
                      <TableHead className="min-w-40 font-semibold">
                        {tLabels("shirtNumber")}{" "}
                        <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead className="min-w-50 font-semibold">
                        {tLabels("startDate")}{" "}
                        <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead className="min-w-50 font-semibold">
                        {tLabels("endDate")}
                      </TableHead>
                      <TableHead className="w-16 text-center font-semibold">
                        {/* {tCommonActions("remove")} */}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: itemCount }, (_, shirtIndex) => (
                      <TableRow
                        key={shirtIndex}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        {/* Index */}
                        <TableCell className="align-top py-3 text-center">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                            {shirtIndex + 1}
                          </span>
                        </TableCell>

                        {/* Shirt Number */}
                        <TableCell className="align-top py-3">
                          <form.Field
                            name={`${arrayFieldName}[${shirtIndex}].shirt_number`}
                          >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(shirtNumberField: any) => (
                              <NumberField
                                field={shirtNumberField}
                                label={tLabels("shirtNumber")}
                                placeholder={tPlaceholders("shirtNumber") || ""}
                                required
                                hideLabel
                              />
                            )}
                          </form.Field>
                        </TableCell>

                        {/* Start Date */}
                        <TableCell className="align-top py-3">
                          <form.Field
                            name={`${arrayFieldName}[${shirtIndex}].start_date`}
                          >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(startDateField: any) => (
                              <form.Subscribe
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                selector={(state: any) => state.values}
                              >
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {(values: any) => {
                                  const joinedAt =
                                    form.getFieldValue(joinedAtFieldName);
                                  const leftAt =
                                    form.getFieldValue(leftAtFieldName);

                                  const previousEndDate =
                                    shirtIndex > 0
                                      ? form.getFieldValue(
                                          `${arrayFieldName}[${shirtIndex - 1}].end_date`,
                                        )
                                      : undefined;

                                  const endDate =
                                    form.getFieldValue(
                                      `${arrayFieldName}[${shirtIndex}].end_date`,
                                    ) ?? undefined;

                                  const nextStartDate =
                                    form.getFieldValue(
                                      `${arrayFieldName}[${shirtIndex + 1}].start_date`,
                                    ) ?? undefined;

                                  const previousEndDateParsed =
                                    parseDateString(previousEndDate);
                                  const joinedAtParsed =
                                    parseDateString(joinedAt);

                                  const nextStartDateParsed =
                                    parseDateString(nextStartDate);
                                  const endDateParsed =
                                    parseDateString(endDate);
                                  const leftAtParsed =
                                    parseDateString(leftAt) ?? undefined;

                                  const minStartDate = previousEndDateParsed
                                    ? addDays(previousEndDateParsed, 1)
                                    : joinedAtParsed;

                                  const maxStartDate =
                                    endDateParsed ??
                                    (nextStartDateParsed
                                      ? subDays(nextStartDateParsed, 1)
                                      : (leftAtParsed ??
                                        new Date(2100, 11, 31)));

                                  return (
                                    <DateField
                                      field={startDateField}
                                      label={tLabels("startDate")}
                                      placeholder={
                                        tPlaceholders("startDate") || ""
                                      }
                                      startMonth={minStartDate}
                                      endMonth={maxStartDate}
                                      minDate={minStartDate}
                                      maxDate={maxStartDate}
                                      required
                                      hideLabel
                                    />
                                  );
                                }}
                              </form.Subscribe>
                            )}
                          </form.Field>
                        </TableCell>

                        {/* End Date */}
                        <TableCell className="align-top py-3">
                          <form.Field
                            name={`${arrayFieldName}[${shirtIndex}].end_date`}
                          >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(endDateField: any) => (
                              <form.Subscribe
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                selector={(state: any) => state.values}
                              >
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {(values: any) => {
                                  const joinedAt =
                                    form.getFieldValue(joinedAtFieldName);
                                  const leftAt =
                                    form.getFieldValue(leftAtFieldName);

                                  const previousEndDate =
                                    shirtIndex > 0
                                      ? form.getFieldValue(
                                          `${arrayFieldName}[${shirtIndex - 1}].end_date`,
                                        )
                                      : undefined;

                                  const startDate = form.getFieldValue(
                                    `${arrayFieldName}[${shirtIndex}].start_date`,
                                  );

                                  const nextStartDate = form.getFieldValue(
                                    `${arrayFieldName}[${shirtIndex + 1}].start_date`,
                                  );

                                  const startDateParsed =
                                    parseDateString(startDate);
                                  const previousEndDateParsed =
                                    parseDateString(previousEndDate);
                                  const joinedAtParsed =
                                    parseDateString(joinedAt);

                                  const nextStartDateParsed =
                                    parseDateString(nextStartDate);
                                  const leftAtParsed =
                                    parseDateString(leftAt) ?? undefined;

                                  const minEndDate = startDateParsed
                                    ? startDateParsed
                                    : previousEndDateParsed
                                      ? addDays(previousEndDateParsed, 1)
                                      : joinedAtParsed;

                                  const maxEndDate = nextStartDateParsed
                                    ? subDays(nextStartDateParsed, 1)
                                    : (leftAtParsed ?? new Date(2100, 11, 31));

                                  return (
                                    <DateField
                                      field={endDateField}
                                      label={tLabels("endDate")}
                                      placeholder={
                                        tPlaceholders("endDate") || ""
                                      }
                                      startMonth={minEndDate}
                                      endMonth={maxEndDate}
                                      minDate={minEndDate}
                                      maxDate={maxEndDate}
                                      required
                                      hideLabel
                                    />
                                  );
                                }}
                              </form.Subscribe>
                            )}
                          </form.Field>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="align-top py-3 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={!canRemove}
                            onClick={() => field.removeValue(shirtIndex)}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title={tCommonActions("remove")}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">
                              {tCommonActions("remove")}
                            </span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </FormSection>
        );
      }}
    </form.Field>
  );
}
