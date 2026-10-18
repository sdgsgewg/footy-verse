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
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";

export interface PlayerContractSectionProps {
  form: PlayerClubTeamCareerForm;
  minItems?: number;
  maxItems?: number;
}

/**
 * Mengambil nilai dari nested object berdasarkan dot-separated path.
 *
 * Contoh:
 * getNestedValue(values, "career.contracts")
 */
function getNestedValue(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  path: string,
) {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (current: any, key) => current?.[key],
      obj,
    );
}

export default function PlayerContractSection({
  form,
  minItems = 0,
  maxItems,
}: PlayerContractSectionProps) {
  const namespace = "dashboard.playerClubTeamCareers.form";

  const tForm = useTranslations(`${namespace}.contracts`);
  const tLabels = useTranslations(`${namespace}.labels.contracts`);
  const tPlaceholders = useTranslations(`${namespace}.placeholders.contracts`);
  const tCommonActions = useTranslations("common.actions");

  const arrayFieldName = "contracts";
  const joinedAtFieldName = "career.joined_at";
  const leftAtFieldName = "career.left_at";

  return (
    <form.Field name={arrayFieldName} mode="array">
      {(field) => (
        <form.Subscribe
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selector={(state: any) =>
            getNestedValue(state.values, arrayFieldName)
          }
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(contracts: any[] | undefined) => {
            const items = contracts ?? [];
            const itemCount = items.length;

            const canAdd = maxItems === undefined || itemCount < maxItems;

            const canRemove = itemCount > minItems;

            const isAllFieldsFilled = items.every((item) => {
              return (
                item.contract_start != null &&
                item.contract_start != "" &&
                item.contract_end != null &&
                item.contract_end != "" &&
                item.salary != null
              );
            });

            const handleAdd = () => {
              const joinedAt = form.getFieldValue(joinedAtFieldName);

              field.pushValue({
                contract_start: itemCount === 0 ? joinedAt : "",
                contract_end: "",
                salary: null,
              });
            };

            const title =
              minItems > 0
                ? `${tForm("title")} (min ${minItems})`
                : `${tForm("title")} (optional)`;

            return (
              <FormSection
                title={title}
                description={
                  itemCount > 0 && !isAllFieldsFilled
                    ? tForm("addInstruction")
                    : undefined
                }
                action={
                  itemCount > 0 && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAdd}
                      disabled={!isAllFieldsFilled}
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
                          <TableHead className="min-w-50 font-semibold">
                            {tLabels("contractStart")}{" "}
                            <span className="text-destructive">*</span>
                          </TableHead>
                          <TableHead className="min-w-50 font-semibold">
                            {tLabels("contractEnd")}{" "}
                            <span className="text-destructive">*</span>
                          </TableHead>
                          <TableHead className="min-w-40 font-semibold">
                            {tLabels("salary")}{" "}
                            <span className="text-destructive">*</span>
                          </TableHead>
                          <TableHead className="w-16 text-center font-semibold">
                            {/* {tCommonActions("remove")} */}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from(
                          { length: itemCount },
                          (_, contractIndex) => (
                            <TableRow
                              key={contractIndex}
                              className="hover:bg-muted/30 transition-colors"
                            >
                              {/* Index */}
                              <TableCell className="align-top py-3 text-center">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                                  {contractIndex + 1}
                                </span>
                              </TableCell>

                              {/* Contract Start */}
                              <TableCell className="align-top py-3">
                                <form.Field
                                  name={`${arrayFieldName}[${contractIndex}].contract_start`}
                                >
                                  {(contractStartField) => (
                                    <form.Subscribe
                                      selector={(state) => state.values}
                                    >
                                      {() => {
                                        const joinedAt =
                                          form.getFieldValue(joinedAtFieldName);
                                        const leftAt =
                                          form.getFieldValue(leftAtFieldName);

                                        const previousContractEnd =
                                          contractIndex > 0
                                            ? form.getFieldValue(
                                                `${arrayFieldName}[${contractIndex - 1}].contract_end`,
                                              )
                                            : undefined;

                                        const contractEnd =
                                          form.getFieldValue(
                                            `${arrayFieldName}[${contractIndex}].contract_end`,
                                          ) ?? undefined;

                                        const nextContractStart =
                                          form.getFieldValue(
                                            `${arrayFieldName}[${contractIndex + 1}].contract_start`,
                                          ) ?? undefined;

                                        const previousContractEndParsed =
                                          parseDateString(previousContractEnd);
                                        const joinedAtParsed =
                                          parseDateString(joinedAt);

                                        const nextContractStartParsed =
                                          parseDateString(nextContractStart);
                                        const contractEndParsed =
                                          parseDateString(contractEnd);
                                        const leftAtParsed =
                                          parseDateString(leftAt) ?? undefined;

                                        const minContractStart =
                                          previousContractEndParsed
                                            ? addDays(
                                                previousContractEndParsed,
                                                1,
                                              )
                                            : joinedAtParsed;

                                        const maxContractStart =
                                          contractEndParsed ??
                                          (nextContractStartParsed
                                            ? subDays(
                                                nextContractStartParsed,
                                                1,
                                              )
                                            : (leftAtParsed ??
                                              new Date(2100, 11, 31)));

                                        return (
                                          <DateField
                                            field={contractStartField}
                                            label={tLabels("contractStart")}
                                            placeholder={
                                              tPlaceholders("contractStart") ||
                                              ""
                                            }
                                            startMonth={minContractStart}
                                            endMonth={maxContractStart}
                                            minDate={minContractStart}
                                            maxDate={maxContractStart}
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
                                  name={`${arrayFieldName}[${contractIndex}].contract_end`}
                                >
                                  {(contractEndField) => (
                                    <form.Subscribe
                                      selector={(state) => state.values}
                                    >
                                      {() => {
                                        const joinedAt =
                                          form.getFieldValue(joinedAtFieldName);
                                        const leftAt =
                                          form.getFieldValue(leftAtFieldName);

                                        const previousContractEnd =
                                          contractIndex > 0
                                            ? form.getFieldValue(
                                                `${arrayFieldName}[${contractIndex - 1}].contract_end`,
                                              )
                                            : undefined;

                                        const contractStart =
                                          form.getFieldValue(
                                            `${arrayFieldName}[${contractIndex}].contract_start`,
                                          );

                                        const nextContractStart =
                                          form.getFieldValue(
                                            `${arrayFieldName}[${contractIndex + 1}].contract_start`,
                                          );

                                        const contractStartParsed =
                                          parseDateString(contractStart);
                                        const previousContractEndParsed =
                                          parseDateString(previousContractEnd);
                                        const joinedAtParsed =
                                          parseDateString(joinedAt);

                                        const nextContractStartParsed =
                                          parseDateString(nextContractStart);
                                        const leftAtParsed =
                                          parseDateString(leftAt) ?? undefined;

                                        const minContractEnd =
                                          contractStartParsed
                                            ? contractStartParsed
                                            : previousContractEndParsed
                                              ? addDays(
                                                  previousContractEndParsed,
                                                  1,
                                                )
                                              : joinedAtParsed;

                                        const maxContractEnd =
                                          nextContractStartParsed
                                            ? subDays(
                                                nextContractStartParsed,
                                                1,
                                              )
                                            : (leftAtParsed ??
                                              new Date(2100, 11, 31));

                                        return (
                                          <DateField
                                            field={contractEndField}
                                            label={tLabels("contractEnd")}
                                            placeholder={
                                              tPlaceholders("contractEnd") || ""
                                            }
                                            startMonth={minContractEnd}
                                            endMonth={maxContractEnd}
                                            minDate={minContractEnd}
                                            maxDate={maxContractEnd}
                                            required
                                            hideLabel
                                          />
                                        );
                                      }}
                                    </form.Subscribe>
                                  )}
                                </form.Field>
                              </TableCell>

                              {/* Salary */}
                              <TableCell className="align-top py-3">
                                <form.Field
                                  name={`${arrayFieldName}[${contractIndex}].salary`}
                                >
                                  {(salaryField) => (
                                    <NumberField
                                      field={salaryField}
                                      label={tLabels("salary")}
                                      placeholder={
                                        tPlaceholders("salary") || ""
                                      }
                                      required
                                      hideLabel
                                    />
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
                                  onClick={() =>
                                    field.removeValue(contractIndex)
                                  }
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
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </FormSection>
            );
          }}
        </form.Subscribe>
      )}
    </form.Field>
  );
}
