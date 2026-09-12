"use client";

import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";

import { TransferType } from "@/enums/TransferType";
import { playerClubTeamCareerMutationSchema } from "@/lib/validations/player-club-team-careers.schema";
import {
  PlayerClubTeamCareerEditResponse,
  UpsertPlayerClubTeamCareerInput,
} from "@/types/player-club-team-career";

const createEmptyPlayerClubTeamCareerForm =
  (): UpsertPlayerClubTeamCareerInput => ({
    id: "",

    club_team_id: "",
    player_career_id: "",

    career: {
      joined_at: "",
      left_at: "",
    },

    contracts: [],

    shirt_numbers: [],

    transfer: {
      from_club_team_id: "",
      to_club_team_id: "",
      transfer_type: "",
      transfer_fee: null,
      transfer_date: "",
    },
  });

function mapPlayerClubTeamCareer(
  playerClubTeamCareer: PlayerClubTeamCareerEditResponse,
): UpsertPlayerClubTeamCareerInput {
  const {
    id,
    clubTeamId,
    playerCareerId,
    career,
    contracts,
    shirtNumbers,
    transfer,
  } = playerClubTeamCareer;

  return {
    id: id,
    club_team_id: clubTeamId,
    player_career_id: playerCareerId,

    career: {
      joined_at: career.joinedAt,
      left_at: career.leftAt,
    },

    contracts: contracts.map((pc) => ({
      contract_start: pc.contractStart,
      contract_end: pc.contractEnd,
      salary: pc.salary,
    })),

    shirt_numbers: shirtNumbers.map((psn) => ({
      shirt_number: psn.shirtNumber,
      start_date: psn.startDate,
      end_date: psn.endDate,
    })),

    transfer: {
      from_club_team_id: transfer.fromClubTeamId,
      to_club_team_id: transfer.toClubTeamId,
      transfer_type: transfer.transferType as TransferType,
      transfer_fee: transfer.transferFee,
      transfer_date: transfer.transferDate,
    },
  };
}

interface UsePlayerClubTeamCareerFormOptions {
  playerClubTeamCareer?: PlayerClubTeamCareerEditResponse;
  onSubmit: (payload: UpsertPlayerClubTeamCareerInput) => void;
}

export function usePlayerClubTeamCareerForm({
  playerClubTeamCareer,
  onSubmit,
}: UsePlayerClubTeamCareerFormOptions) {
  const defaultValues = useMemo(
    () =>
      playerClubTeamCareer
        ? mapPlayerClubTeamCareer(playerClubTeamCareer)
        : createEmptyPlayerClubTeamCareerForm(),
    [playerClubTeamCareer],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: playerClubTeamCareerMutationSchema,
      onChange: playerClubTeamCareerMutationSchema,
      onSubmit: playerClubTeamCareerMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertPlayerClubTeamCareerInput = {
        club_team_id: value.club_team_id,
        player_career_id: value.player_career_id,

        career: {
          joined_at: value.career.joined_at,
          left_at: value.career.left_at ?? null,
        },

        contracts: value.contracts
          ? value.contracts.map((item) => ({
              ...item,
            }))
          : [],

        shirt_numbers: value.shirt_numbers
          ? value.shirt_numbers.map((item) => ({
              ...item,
              end_date: item.end_date || null,
            }))
          : [],

        transfer: value.transfer,
      };

      onSubmit(payload);
    },
  });

  return form;
}

export type PlayerClubTeamCareerForm = ReturnType<
  typeof usePlayerClubTeamCareerForm
>;
