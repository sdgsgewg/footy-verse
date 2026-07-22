"use client";

import { PlayerNationalTeamCreateInput } from "@/types/player-national-teams";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { useCreatePlayerNationalTeamForm } from "@/hooks/dashboard/player-national-teams";
import FormContentWrapper from "../base/FormContentWrapper";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import PlayerNationalTeamSection from "./PlayerNationalTeamSection";

interface Props {
  loading?: boolean;
  onSubmit: (payload: PlayerNationalTeamCreateInput) => void;
}

const CreatePlayerNationalTeamForm = ({ loading = false, onSubmit }: Props) => {
  const { form, setForm, canSubmit, buildPayload } =
    useCreatePlayerNationalTeamForm();

  const { nationalities } = useNationalities();

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        <PlayerNationalTeamSection
          form={form}
          setForm={setForm}
          nationalities={nationalities}
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default CreatePlayerNationalTeamForm;
