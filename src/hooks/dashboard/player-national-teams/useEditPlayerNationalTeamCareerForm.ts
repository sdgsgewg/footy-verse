"use client";

import { useMemo } from "react";
import {
  PlayerNationalTeamCareerEditResponse,
  PlayerNationalTeamCareerUpdateInput,
} from "@/types/player-national-team-career";
import { useEntityForm } from "@/hooks/crud";
import { playerNationalTeamCareerMutationSchema } from "@/lib/validations/player-national-team-careers.schema";

const createEmptyUpdatePlayerNationalTeamCareerForm =
  (): PlayerNationalTeamCareerUpdateInput => ({
    national_team_id: "",

    career: {
      joined_at: "",
      left_at: "",
    },

    shirt_numbers: [],
  });

function mapPlayerNationalTeamCareer(
  playerNationalTeamCareer: PlayerNationalTeamCareerEditResponse,
): PlayerNationalTeamCareerUpdateInput {
  const { nationalTeamId, playerCareerId, career, shirtNumbers } =
    playerNationalTeamCareer;

  return {
    national_team_id: nationalTeamId,
    player_career_id: playerCareerId,

    career: {
      joined_at: career.joinedAt,
      left_at: career.leftAt,
    },

    shirt_numbers: shirtNumbers.map((psn) => ({
      shirt_number: psn.shirtNumber,
      start_date: psn.startDate,
      end_date: psn.endDate,
    })),
  };
}

export function useEditPlayerNationalTeamCareerForm(
  playerNationalTeamCareer: PlayerNationalTeamCareerEditResponse,
) {
  const initialValue = useMemo(
    () =>
      playerNationalTeamCareer
        ? mapPlayerNationalTeamCareer(playerNationalTeamCareer)
        : createEmptyUpdatePlayerNationalTeamCareerForm(),
    [playerNationalTeamCareer],
  );

  const { form, setForm, initialForm, isDirty, canSubmit, resetForm } =
    useEntityForm<PlayerNationalTeamCareerUpdateInput>({
      initialValue,

      // Sesuaikan dengan schema update kamu
      schema: playerNationalTeamCareerMutationSchema,

      dirtyFields: ["national_team_id", "career", "shirt_numbers"],

      isFilled: (form) => {
        const isCareerValid = form.career.joined_at.trim().length > 0;

        const areShirtNumbersValid =
          form.shirt_numbers.length > 0 &&
          form.shirt_numbers.every((item) => {
            return (
              item.shirt_number !== null &&
              item.shirt_number > 0 &&
              item.start_date.trim().length > 0
            );
          });

        return (
          form.national_team_id.trim().length > 0 &&
          isCareerValid &&
          areShirtNumbersValid
        );
      },
    });

  const isEditing = playerNationalTeamCareer != null;

  const buildPayload = (): PlayerNationalTeamCareerUpdateInput => {
    const { national_team_id, player_career_id, career, shirt_numbers } = form;

    return {
      national_team_id,
      player_career_id,

      career: {
        joined_at: career.joined_at,
        left_at: career.left_at ?? null,
      },

      shirt_numbers: shirt_numbers.map((item) => ({
        ...item,
        end_date: item.end_date || null,
      })),
    };
  };

  return {
    form,
    setForm,

    initialForm,

    isEditing,
    isDirty,
    canSubmit,

    buildPayload,
    resetForm,
  };
}
