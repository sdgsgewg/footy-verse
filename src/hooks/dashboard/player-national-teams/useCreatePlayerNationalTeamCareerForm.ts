"use client";

import { useEntityForm } from "@/hooks/crud";
import { playerNationalTeamCareerMutationSchema } from "@/lib/validations/player-national-team-careers.schema";
import { PlayerNationalTeamCareerCreateInput } from "@/types/player-national-team-career";

const createEmptyPlayerNationalTeamCareerForm =
  (): PlayerNationalTeamCareerCreateInput => [
    {
      national_team_id: "",

      career: {
        joined_at: "",
        left_at: "",
      },

      shirt_numbers: [],
    },
  ];

export function useCreatePlayerNationalTeamCareerForm() {
  const { form, setForm, isDirty, canSubmit, resetForm } =
    useEntityForm<PlayerNationalTeamCareerCreateInput>({
      initialValue: createEmptyPlayerNationalTeamCareerForm(),

      schema: playerNationalTeamCareerMutationSchema,

      checkDirty: false,

      isDirty: (form) =>
        form.some(
          (item) =>
            item.national_team_id.trim() !== "" ||
            item.career.joined_at.trim() !== "" ||
            item.career.left_at?.trim() !== "" ||
            item.shirt_numbers.some(
              (shirt) =>
                shirt.shirt_number !== null ||
                shirt.start_date.trim() !== "" ||
                shirt.end_date?.trim() !== "",
            ),
        ),

      isFilled: (form) => {
        return form.every((item) => {
          const isCareerValid = item.career.joined_at.trim().length > 0;

          const areShirtNumbersValid = item.shirt_numbers.every(
            (shirtNumber) => {
              return (
                shirtNumber.shirt_number !== null &&
                shirtNumber.shirt_number > 0 &&
                shirtNumber.start_date.trim().length > 0
              );
            },
          );

          return (
            item.national_team_id.trim().length > 0 &&
            isCareerValid &&
            areShirtNumbersValid
          );
        });
      },
    });

  const buildPayload = (): PlayerNationalTeamCareerCreateInput => {
    return form.map((item) => ({
      national_team_id: item.national_team_id,

      career: {
        joined_at: item.career.joined_at,
        left_at: item.career.left_at || null,
      },

      shirt_numbers: item.shirt_numbers.map((shirtNumber) => ({
        ...shirtNumber,
        end_date: shirtNumber.end_date || null,
      })),
    }));
  };

  return {
    form,
    setForm,
    isDirty,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
