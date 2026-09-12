"use client";

import { useTranslations } from "next-intl";

import { PlayerNationalTeamCareerCreateInput } from "@/types/player-national-team-career";

import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";

import { ComboboxField, DateField, NumberField } from "../fields";

import { useCreatePlayerNationalTeamCareerForm } from "@/hooks/dashboard/player-national-teams";

import { useNationalTeams } from "@/hooks/national-teams";
import { getNationalTeamOptions } from "@/lib/national-teams/options";
import { useCrudFormState } from "@/hooks/crud";
import DynamicFormSection from "../base/DynamicFormSection";

interface Props {
  loading?: boolean;
  onSubmit: (payload: PlayerNationalTeamCareerCreateInput) => void;
}

const CreatePlayerNationalTeamCareerForm = ({
  loading = false,
  onSubmit,
}: Props) => {
  const tForm = useTranslations("dashboard.playerNationalTeamCareers.form");

  const tLabels = useTranslations(
    "dashboard.playerNationalTeamCareers.form.labels",
  );

  const tPlaceholders = useTranslations(
    "dashboard.playerNationalTeamCareers.form.placeholders",
  );

  const form = useCreatePlayerNationalTeamCareerForm({
    onSubmit,
  });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const { nationalTeams } = useNationalTeams();

  const nationalTeamOptions = getNationalTeamOptions(nationalTeams);

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FormHeader loading={loading} mode="create" canSubmit={canSubmit} />

        <FormContentWrapper className="space-y-5">
          <form.Field name="careers" mode="array">
            {(careersField) => (
              <DynamicFormSection
                title={tForm("career.title")}
                noData={tForm("career.noData")}
                itemCount={careersField.state.value.length}
                minItems={1}
                onAdd={() =>
                  careersField.pushValue({
                    national_team_id: "",
                    career: {
                      joined_at: "",
                      left_at: "",
                    },
                    shirt_numbers: [
                      {
                        shirt_number: null,
                        start_date: "",
                        end_date: "",
                      },
                    ],
                  })
                }
                onRemove={(index) => careersField.removeValue(index)}
              >
                {(careerIndex) => (
                  <div className="space-y-5">
                    {/* National Team */}
                    <form.Field
                      name={`careers[${careerIndex}].national_team_id`}
                    >
                      {(field) => (
                        <ComboboxField
                          field={field}
                          entityKey="nationalTeam"
                          label={tLabels("career.nation")}
                          options={nationalTeamOptions}
                          placeholder={tPlaceholders("career.nation") || ""}
                          required
                        />
                      )}
                    </form.Field>

                    {/* Joined Date */}
                    <form.Field
                      name={`careers[${careerIndex}].career.joined_at`}
                      listeners={{
                        onChange: ({ value }) => {
                          const firstShirtNumber = form.getFieldValue(
                            `careers[${careerIndex}].shirt_numbers[0]`,
                          );

                          if (!firstShirtNumber?.start_date) {
                            form.setFieldValue(
                              `careers[${careerIndex}].shirt_numbers[0].start_date`,
                              value,
                            );
                          }
                        },
                      }}
                    >
                      {(field) => (
                        <DateField
                          field={field}
                          label={tLabels("career.joinedAt")}
                          placeholder={tPlaceholders("career.joinedAt") || ""}
                          required
                        />
                      )}
                    </form.Field>

                    {/* Left Date */}
                    <form.Field name={`careers[${careerIndex}].career.left_at`}>
                      {(field) => (
                        <DateField
                          field={field}
                          label={tLabels("career.leftAt")}
                          placeholder={tPlaceholders("career.leftAt") || ""}
                        />
                      )}
                    </form.Field>

                    {/* Shirt Numbers */}
                    <form.Field
                      name={`careers[${careerIndex}].shirt_numbers`}
                      mode="array"
                    >
                      {(shirtNumbersField) => (
                        <DynamicFormSection
                          title={tForm("shirtNumbers.title")}
                          noData={tForm("shirtNumbers.noData")}
                          itemCount={shirtNumbersField.state.value.length}
                          minItems={1}
                          onAdd={() =>
                            shirtNumbersField.pushValue({
                              shirt_number: 1,
                              start_date: "",
                              end_date: "",
                            })
                          }
                          onRemove={(index) =>
                            shirtNumbersField.removeValue(index)
                          }
                        >
                          {(shirtIndex) => (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                              {/* Shirt Number */}
                              <form.Field
                                name={`careers[${careerIndex}].shirt_numbers[${shirtIndex}].shirt_number`}
                              >
                                {(field) => (
                                  <NumberField
                                    field={field}
                                    label={tLabels("shirtNumbers.shirtNumber")}
                                    placeholder={
                                      tPlaceholders(
                                        "shirtNumbers.shirtNumber",
                                      ) || ""
                                    }
                                    required
                                  />
                                )}
                              </form.Field>

                              {/* Start Date */}
                              <form.Field
                                name={`careers[${careerIndex}].shirt_numbers[${shirtIndex}].start_date`}
                              >
                                {(field) => (
                                  <DateField
                                    field={field}
                                    label={tLabels("shirtNumbers.startDate")}
                                    placeholder={
                                      tPlaceholders("shirtNumbers.startDate") ||
                                      ""
                                    }
                                    required
                                  />
                                )}
                              </form.Field>

                              {/* End Date */}
                              <form.Field
                                name={`careers[${careerIndex}].shirt_numbers[${shirtIndex}].end_date`}
                              >
                                {(field) => (
                                  <DateField
                                    field={field}
                                    label={tLabels("shirtNumbers.endDate")}
                                    placeholder={
                                      tPlaceholders("shirtNumbers.endDate") ||
                                      ""
                                    }
                                  />
                                )}
                              </form.Field>
                            </div>
                          )}
                        </DynamicFormSection>
                      )}
                    </form.Field>
                  </div>
                )}
              </DynamicFormSection>
            )}
          </form.Field>
        </FormContentWrapper>
      </form>
    </FormWrapper>
  );
};

export default CreatePlayerNationalTeamCareerForm;
