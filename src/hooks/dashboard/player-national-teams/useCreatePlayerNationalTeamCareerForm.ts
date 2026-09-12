"use client";

import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";

import { PlayerNationalTeamCareerCreateInput } from "@/types/player-national-team-career";
import {
  playerNationalTeamCareerFormSchema,
  PlayerNationalTeamCareerFormValues,
} from "@/lib/validations/player-national-team-careers/player-national-team-careers-form.schema";

const createEmptyCareer =
  (): PlayerNationalTeamCareerFormValues["careers"][number] => ({
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
  });

const createEmptyForm = (): PlayerNationalTeamCareerFormValues => ({
  careers: [createEmptyCareer()],
});

interface UseCreatePlayerNationalTeamCareerFormOptions {
  onSubmit: (payload: PlayerNationalTeamCareerCreateInput) => void;
}

export function useCreatePlayerNationalTeamCareerForm({
  onSubmit,
}: UseCreatePlayerNationalTeamCareerFormOptions) {
  const defaultValues = useMemo(() => createEmptyForm(), []);

  const form = useForm({
    defaultValues,

    validators: {
      onMount: playerNationalTeamCareerFormSchema,
      onChange: playerNationalTeamCareerFormSchema,
      onSubmit: playerNationalTeamCareerFormSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: PlayerNationalTeamCareerCreateInput = value.careers.map(
        (career) => ({
          national_team_id: career.national_team_id,

          career: {
            joined_at: career.career.joined_at,
            left_at: career.career.left_at || null,
          },

          shirt_numbers: career.shirt_numbers.map((shirtNumber) => ({
            shirt_number: shirtNumber.shirt_number,
            start_date: shirtNumber.start_date,
            end_date: shirtNumber.end_date || null,
          })),
        }),
      );

      onSubmit(payload);
    },
  });

  return form;
}
