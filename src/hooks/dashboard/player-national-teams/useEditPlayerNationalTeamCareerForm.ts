"use client";

import {
  PlayerNationalTeamCareerEditResponse,
  PlayerNationalTeamCareerUpdateInput,
} from "@/types/player-national-team-career";
import { useMemo, useState } from "react";

const emptyUpdatePlayerNationalTeamCareerForm: PlayerNationalTeamCareerUpdateInput =
  {
    national_team_id: "",

    career: {
      joined_at: "",
      left_at: "",
    },

    shirt_numbers: [],
  };

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
        : emptyUpdatePlayerNationalTeamCareerForm,
    [playerNationalTeamCareer],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = playerNationalTeamCareer != null;

  const isCareerValid = form.career.joined_at.trim().length > 0;

  const areShirtNumbersValid = form.shirt_numbers.every((item) => {
    return (
      item.shirt_number !== null &&
      item.shirt_number > 0 &&
      item.start_date.trim().length > 0
    );
  });

  const canSubmit = useMemo(() => {
    const isFilled =
      form.national_team_id.trim().length > 0 &&
      isCareerValid &&
      areShirtNumbersValid;

    if (!isFilled) {
      return false;
    }

    return (
      form.national_team_id !== initialForm.national_team_id ||
      JSON.stringify(form.career) !== JSON.stringify(initialForm.career) ||
      JSON.stringify(form.shirt_numbers) !==
        JSON.stringify(initialForm.shirt_numbers)
    );
  }, [form, isCareerValid, areShirtNumbersValid, initialForm]);

  const buildPayload = () => {
    const { national_team_id, player_career_id, career, shirt_numbers } = form;

    const payload: PlayerNationalTeamCareerUpdateInput = {
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

    return payload;
  };

  const resetForm = () => {
    setForm(initialValue);
  };

  return {
    form,
    setForm,
    initialForm,
    isEditing,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
