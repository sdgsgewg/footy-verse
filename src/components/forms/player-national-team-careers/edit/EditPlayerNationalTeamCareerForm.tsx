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
  const { form, setForm, canSubmit, buildPayload } =
    useEditPlayerNationalTeamCareerForm(playerNationalTeamCareer);

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={false}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <PlayerCareerSection form={form} setForm={setForm} />
          </div>

          <div className="lg:grid-cols-6">
            <PlayerShirtNumberSection form={form} setForm={setForm} />
          </div>
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default EditPlayerNationalTeamCareerForm;
