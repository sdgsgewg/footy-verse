"use client";

import {
  PlayerNationalTeamCareerUpdateInput,
  PlayerNationalTeamCareerEditResponse,
} from "@/types/player-national-team-career";
import FormHeader from "../../base/FormHeader";
import FormWrapper from "../../base/FormWrapper";
import { useEditPlayerNationalTeamCareerForm } from "@/hooks/dashboard/player-national-teams";
import FormContentWrapper from "../../base/FormContentWrapper";
import PlayerShirtNumberSection from "./PlayerShirtNumberSection";
import PlayerCareerSection from "./PlayerCareerSection";
import { useCrudFormState } from "@/hooks/crud";

interface Props {
  playerNationalTeamCareer: PlayerNationalTeamCareerEditResponse;
  loading?: boolean;
  onSubmit: (payload: PlayerNationalTeamCareerUpdateInput) => void;
}

const EditPlayerNationalTeamCareerForm = ({
  playerNationalTeamCareer,
  loading = false,
  onSubmit,
}: Props) => {
  const form = useEditPlayerNationalTeamCareerForm({
    playerNationalTeamCareer,
    onSubmit,
  });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FormHeader loading={loading} mode="edit" canSubmit={canSubmit} />

        <FormContentWrapper className="space-y-6">
          <div className="">
            <PlayerCareerSection form={form} />
          </div>

          <div className="">
            <PlayerShirtNumberSection form={form} />
          </div>
        </FormContentWrapper>
      </form>
    </FormWrapper>
  );
};

export default EditPlayerNationalTeamCareerForm;
