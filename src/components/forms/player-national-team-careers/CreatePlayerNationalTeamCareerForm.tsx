"use client";

import { PlayerNationalTeamCareerCreateInput } from "@/types/player-national-team-career";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { useCreatePlayerNationalTeamCareerForm } from "@/hooks/dashboard/player-national-teams";
import FormContentWrapper from "../base/FormContentWrapper";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { ComboboxField, DateField, NumberField } from "../fields";
import { useNationalTeams } from "@/hooks/national-teams";
import { getNationalTeamOptions } from "@/lib/national-teams/options";

type PlayerNationalTeamCareer =
  NonNullable<PlayerNationalTeamCareerCreateInput>[number];

type ShirtNumber = PlayerNationalTeamCareer["shirt_numbers"][number];

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

  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const { form, setForm, canSubmit, buildPayload } =
    useCreatePlayerNationalTeamCareerForm();

  const { nationalTeams } = useNationalTeams();
  const nationalTeamOptions = getNationalTeamOptions(nationalTeams);

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        <DynamicFormSection<PlayerNationalTeamCareer>
          title={tForm("title")}
          noData={tForm("noData")}
          items={form ?? []}
          createItem={() => ({
            national_team_id: "",

            career: {
              joined_at: "",
              left_at: "",
            },

            shirt_numbers: [],
          })}
          onChange={(items) => setForm(items)}
          renderItem={(careerItem, careerIndex, updateCareerItem) => (
            <>
              {/* National Team */}
              <ComboboxField
                label={tLabels("career.nation")}
                name={`nationality-${careerIndex}`}
                options={nationalTeamOptions}
                placeholder={tPlaceholders("career.nation") || ""}
                searchPlaceholder={tCommon("combobox.searchEntity", {
                  entity: tEntities("nationality").toLowerCase(),
                })}
                emptyMessage={tCommon("combobox.noEntityFound", {
                  entity: tEntities("nationality").toLowerCase(),
                })}
                value={careerItem.national_team_id}
                onChange={(v) =>
                  updateCareerItem(careerIndex, "national_team_id", v as string)
                }
                required
              />

              {/* Joined Date */}
              <DateField
                label={tLabels("career.joinedAt")}
                name={`joined-at-${careerIndex}`}
                placeholder={tPlaceholders("career.joinedAt") || ""}
                value={careerItem.career.joined_at}
                onChange={(v) =>
                  updateCareerItem(careerIndex, "career", {
                    ...careerItem.career,
                    joined_at: v,
                  })
                }
                required
              />

              {/* Left Date */}
              <DateField
                label={tLabels("career.leftAt")}
                name={`left-at-${careerIndex}`}
                placeholder={tPlaceholders("career.leftAt") || ""}
                value={careerItem.career.left_at ?? ""}
                onChange={(v) =>
                  updateCareerItem(careerIndex, "career", {
                    ...careerItem.career,
                    left_at: v,
                  })
                }
              />

              {/* Shirt Number Section */}
              <div className="mt-6 border-t pt-6">
                <DynamicFormSection<ShirtNumber>
                  title={tForm("shirtNumbers.title")}
                  noData={tForm("shirtNumbers.noData")}
                  items={careerItem.shirt_numbers ?? []}
                  minItems={1}
                  createItem={() => ({
                    shirt_number: 1,
                    start_date: "",
                    end_date: "",
                  })}
                  onChange={(newShirtNumbers) =>
                    updateCareerItem(
                      careerIndex,
                      "shirt_numbers",
                      newShirtNumbers,
                    )
                  }
                  renderItem={(shirtItem, shirtIndex, updateShirtItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Shirt Number */}
                      <NumberField
                        label={tLabels("shirtNumbers.shirtNumber")}
                        name={`shirt-number-${careerIndex}-${shirtIndex}`}
                        placeholder={
                          tPlaceholders("shirtNumbers.shirtNumber") || ""
                        }
                        value={shirtItem.shirt_number}
                        onChange={(v) =>
                          updateShirtItem(shirtIndex, "shirt_number", v ?? 1)
                        }
                        required
                      />

                      {/* Start Date */}
                      <DateField
                        label={tLabels("shirtNumbers.startDate")}
                        name={`start-date-${careerIndex}-${shirtIndex}`}
                        placeholder={
                          tPlaceholders("shirtNumbers.startDate") || ""
                        }
                        value={shirtItem.start_date}
                        onChange={(v) =>
                          updateShirtItem(shirtIndex, "start_date", v)
                        }
                        required
                      />

                      {/* End Date */}
                      <DateField
                        label={tLabels("shirtNumbers.endDate")}
                        name={`end-date-${careerIndex}-${shirtIndex}`}
                        placeholder={
                          tPlaceholders("shirtNumbers.endDate") || ""
                        }
                        value={shirtItem.end_date ?? ""}
                        onChange={(v) =>
                          updateShirtItem(shirtIndex, "end_date", v)
                        }
                      />
                    </div>
                  )}
                />
              </div>
            </>
          )}
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default CreatePlayerNationalTeamCareerForm;
