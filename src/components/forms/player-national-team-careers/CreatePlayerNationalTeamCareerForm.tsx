"use client";

import { useTranslations } from "next-intl";

import { PlayerNationalTeamCareerCreateInput } from "@/types/player-national-team-career";

import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";

import { ComboboxField, DateField } from "../fields";

import { useCreatePlayerNationalTeamCareerForm } from "@/hooks/dashboard/player-national-teams";

import { useNationalTeams } from "@/hooks/national-teams";
import { getNationalTeamOptions } from "@/lib/national-teams/options";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import DynamicFormSection from "../shared/DynamicFormSection";
import { parseDateString } from "@/lib/utils/date";
import PlayerShirtNumberSection from "../shared/PlayerShirtNumberSection";

interface Props {
  loading?: boolean;
  onSubmit: (payload: PlayerNationalTeamCareerCreateInput) => void;
}

const CreatePlayerNationalTeamCareerForm = ({
  loading = false,
  onSubmit,
}: Props) => {
  const tForm = useTranslations("dashboard.playerNationalTeamCareers.form");

  const { tLabels, tPlaceholders } = useCrudFormTranslations(
    "playerNationalTeamCareer",
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

                    {/* Join Date */}
                    <form.Field name={`careers[${careerIndex}].career.left_at`}>
                      {(leftAtField) => (
                        <form.Field
                          name={`careers[${careerIndex}].career.joined_at`}
                          listeners={{
                            onChange: ({ value }) => {
                              form.setFieldValue(
                                `careers[${careerIndex}].shirt_numbers[0].start_date`,
                                value,
                              );
                            },
                          }}
                        >
                          {(field) => (
                            <DateField
                              field={field}
                              label={tLabels("career.joinedAt")}
                              placeholder={
                                tPlaceholders("career.joinedAt") || ""
                              }
                              endMonth={new Date(2100, 11, 31)}
                              maxDate={parseDateString(leftAtField.state.value)}
                              required
                            />
                          )}
                        </form.Field>
                      )}
                    </form.Field>

                    {/* Left Date */}
                    <form.Field
                      name={`careers[${careerIndex}].career.joined_at`}
                    >
                      {(joinedAtField) => (
                        <form.Field
                          name={`careers[${careerIndex}].career.left_at`}
                        >
                          {(field) => (
                            <DateField
                              field={field}
                              label={tLabels("career.leftAt")}
                              placeholder={tPlaceholders("career.leftAt") || ""}
                              startMonth={parseDateString(
                                joinedAtField.state.value,
                              )}
                              endMonth={new Date(2100, 11, 31)}
                              minDate={parseDateString(
                                joinedAtField.state.value,
                              )}
                            />
                          )}
                        </form.Field>
                      )}
                    </form.Field>

                    {/* Shirt Numbers */}
                    <PlayerShirtNumberSection
                      form={form}
                      namePrefix={`careers[${careerIndex}]`}
                      entityType="nationalTeam"
                      minItems={1}
                    />
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
