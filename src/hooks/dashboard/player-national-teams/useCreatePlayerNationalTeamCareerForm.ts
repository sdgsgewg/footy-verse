"use client";

import { PlayerNationalTeamCareerCreateInput } from "@/types/player-national-team-career";
import { useMemo, useState } from "react";

const emptyPlayerNationalTeamCareerForm: PlayerNationalTeamCareerCreateInput = [
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
  const [form, setForm] = useState<PlayerNationalTeamCareerCreateInput>(
    emptyPlayerNationalTeamCareerForm,
  );

  const canSubmit = useMemo(() => {
    const isFilled =
      form &&
      form.every((item) => {
        const isCareerValid = item.career.joined_at.trim().length > 0;

        const areShirtNumbersValid = item.shirt_numbers.every((item) => {
          return item.shirt_number > 0 && item.start_date.trim().length > 0;
        });

        return (
          item.national_team_id.trim().length > 0 &&
          isCareerValid &&
          areShirtNumbersValid
        );
      });

    if (!isFilled) {
      return false;
    }

    return true;
  }, [form]);

  const buildPayload = () => {
    const payload: PlayerNationalTeamCareerCreateInput = form.map((form) => {
      const { national_team_id, career, shirt_numbers } = form;

      return {
        national_team_id: national_team_id,

        career: {
          joined_at: career.joined_at,
          left_at: career.left_at ?? null,
        },

        shirt_numbers: shirt_numbers.map((item) => ({
          ...item,
          end_date: item.end_date || null,
        })),
      };
    });

    return payload;
  };

  const resetForm = () => {
    setForm(emptyPlayerNationalTeamCareerForm);
  };

  return {
    form,
    setForm,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
