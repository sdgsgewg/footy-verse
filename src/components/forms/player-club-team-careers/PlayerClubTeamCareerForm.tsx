"use client";

import {
  PlayerClubTeamCareerEditResponse,
  UpsertPlayerClubTeamCareerInput,
} from "@/types/player-club-team-career";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { usePlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";
import PlayerContractSection from "./PlayerContractSection";
import FormContentWrapper from "../base/FormContentWrapper";
import PlayerCareerSection from "./PlayerCareerSection";
import PlayerTransferSection from "./PlayerTransferSection";
import { useCrudFormState } from "@/hooks/crud";
import { FormMode } from "@/types/form";
import PlayerShirtNumberSection from "../shared/PlayerShirtNumberSection";

interface Props {
  mode: FormMode;
  playerClubTeamCareer?: PlayerClubTeamCareerEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertPlayerClubTeamCareerInput) => void;
}

const PlayerClubTeamCareerForm = ({
  mode,
  playerClubTeamCareer,
  loading = false,
  onSubmit,
}: Props) => {
  const form = usePlayerClubTeamCareerForm({ playerClubTeamCareer, onSubmit });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <FormWrapper isDirty={isDirty}>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      > */}
      <FormHeader
        loading={loading}
        mode={mode}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="xl:grid-cols-6">
            <PlayerCareerSection form={form} />
          </div>

          <div className="xl:grid-cols-6">
            <PlayerTransferSection form={form} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <PlayerContractSection form={form} />

          <PlayerShirtNumberSection
            form={form}
            entityType="clubTeam"
            minItems={0}
          />
        </div>
      </FormContentWrapper>
      {/* </form> */}
    </FormWrapper>
  );
};

export default PlayerClubTeamCareerForm;
