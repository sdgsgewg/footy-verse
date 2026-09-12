"use client";

import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";
import {
  PlayerNationalTeamCareerEditResponse,
  PlayerNationalTeamCareerUpdateInput,
} from "@/types/player-national-team-career";
import { playerNationalTeamCareerMutationSchema } from "@/lib/validations/player-national-team-careers/player-national-team-careers.schema";

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

interface UseEditPlayerNationalTeamCareerFormOptions {
  playerNationalTeamCareer: PlayerNationalTeamCareerEditResponse;
  onSubmit: (payload: PlayerNationalTeamCareerUpdateInput) => void;
}

export function useEditPlayerNationalTeamCareerForm({
  playerNationalTeamCareer,
  onSubmit,
}: UseEditPlayerNationalTeamCareerFormOptions) {
  const defaultValues = useMemo(
    () =>
      playerNationalTeamCareer
        ? mapPlayerNationalTeamCareer(playerNationalTeamCareer)
        : createEmptyUpdatePlayerNationalTeamCareerForm(),
    [playerNationalTeamCareer],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: playerNationalTeamCareerMutationSchema,
      onChange: playerNationalTeamCareerMutationSchema,
      onSubmit: playerNationalTeamCareerMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: PlayerNationalTeamCareerUpdateInput = {
        national_team_id: value.national_team_id,
        player_career_id: value.player_career_id,

        career: {
          joined_at: value.career.joined_at,
          left_at: value.career.left_at ?? null,
        },

        shirt_numbers: value.shirt_numbers.map((item) => ({
          ...item,
          end_date: item.end_date || null,
        })),
      };

      onSubmit(payload);
    },
  });

  return form;
}

export type EditPlayerNationalTeamCareerForm = ReturnType<
  typeof useEditPlayerNationalTeamCareerForm
>;
