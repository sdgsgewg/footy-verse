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

      <FormContentWrapper className="space-y-6">
        <div className="">
          <PlayerCareerSection form={form} setForm={setForm} />
        </div>

        <div className="">
          <PlayerShirtNumberSection form={form} setForm={setForm} />
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default EditPlayerNationalTeamCareerForm;
