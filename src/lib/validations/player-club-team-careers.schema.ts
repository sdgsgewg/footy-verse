import { z } from "zod";
import { playerContractMutationSchema } from "./player-contracts.schema";
import { playerShirtNumberMutationSchema } from "./player-shirt-numbers.schema";
import { playerTransferMutationSchema } from "./player-transfers.schema";
import { idSchema } from "./primitives.schema";
import { playerCareerMutationSchema } from "./player-careers.schema";

export const playerClubTeamCareerMutationSchema = z
  .object({
    club_team_id: idSchema,
    player_career_id: z.string().nullable().optional(),
    career: playerCareerMutationSchema,
    contracts: playerContractMutationSchema.array().optional(),
    shirt_numbers: playerShirtNumberMutationSchema.array().optional(),
    transfer: playerTransferMutationSchema,
  })
  .superRefine((data, ctx) => {
    const { joined_at, left_at } = data.career;

    /*
     * --------------------------------------------------
     * Career period
     * --------------------------------------------------
     */

    /*
     * --------------------------------------------------
     * Contracts
     * --------------------------------------------------
     */

    data.contracts?.forEach((contract, index) => {
      const { contract_start, contract_end } = contract;

      // Contract start <= contract end
      if (contract_start > contract_end) {
        ctx.addIssue({
          code: "custom",
          message: "Contract start must be less than or equal to contract end",
          path: ["contracts", index, "contract_start"],
        });
      }

      // Contract must start after/equal to career join
      if (contract_start < joined_at) {
        ctx.addIssue({
          code: "custom",
          message: "Contract start cannot be before career join date",
          path: ["contracts", index, "contract_start"],
        });
      }

      // Contract must end before/equal to career left
      // if (left_at && contract_end > left_at) {
      //   ctx.addIssue({
      //     code: "custom",
      //     message: "Contract end cannot be after career left date",
      //     path: ["contracts", index, "contract_end"],
      //   });
      // }
    });

    /*
     * --------------------------------------------------
     * Shirt Numbers
     * --------------------------------------------------
     */

    data.shirt_numbers?.forEach((shirtNumber, index) => {
      const { start_date, end_date } = shirtNumber;

      // Shirt number start cannot be before career join
      if (start_date < joined_at) {
        ctx.addIssue({
          code: "custom",
          message: "Shirt number start date cannot be before career join date",
          path: ["shirt_numbers", index, "start_date"],
        });
      }

      // Shirt number start cannot be after career left
      if (left_at && start_date > left_at) {
        ctx.addIssue({
          code: "custom",
          message: "Shirt number start date cannot be after career left date",
          path: ["shirt_numbers", index, "start_date"],
        });
      }

      // Shirt number end cannot be before career join
      if (end_date && end_date < joined_at) {
        ctx.addIssue({
          code: "custom",
          message: "Shirt number end date cannot be before career join date",
          path: ["shirt_numbers", index, "end_date"],
        });
      }

      // Shirt number end cannot be after career left
      if (left_at && end_date && end_date > left_at) {
        ctx.addIssue({
          code: "custom",
          message: "Shirt number end date cannot be after career left date",
          path: ["shirt_numbers", index, "end_date"],
        });
      }
    });

    /*
     * --------------------------------------------------
     * Transfer
     * --------------------------------------------------
     */

    const { transfer_date } = data.transfer;

    // To club team must be equal to club team
    if (data.transfer.to_club_team_id !== data.club_team_id) {
      ctx.addIssue({
        code: "custom",
        message: "Transfer destination must match the career club/team",
        path: ["transfer", "to_club_team_id"],
      });
    }

    // Transfer date cannot be before career join
    if (transfer_date < joined_at) {
      ctx.addIssue({
        code: "custom",
        message: "Transfer date cannot be before career join date",
        path: ["transfer", "transfer_date"],
      });
    }

    // Transfer date cannot be after career left
    if (left_at && transfer_date > left_at) {
      ctx.addIssue({
        code: "custom",
        message: "Transfer date cannot be after career left date",
        path: ["transfer", "transfer_date"],
      });
    }
  });

export const createPlayerClubTeamCareerSchema =
  playerClubTeamCareerMutationSchema;

export const updatePlayerClubTeamCareerSchema =
  playerClubTeamCareerMutationSchema;

export const playerClubTeamCareerSchema =
  playerClubTeamCareerMutationSchema.extend({
    id: idSchema,
    created_at: z.string(),
    updated_at: z.string().nullable(),
  });

export const playerClubTeamCareersSchema = z.array(playerClubTeamCareerSchema);
