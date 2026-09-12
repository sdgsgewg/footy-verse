"use client";

import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";

import { CompetitionEditResponse } from "@/types/competition";

import { ParticipantType } from "@/enums/ParticipantType";
import { Gender } from "@/enums/Gender";
import { AgeGroup } from "@/enums/AgeGroup";

import { ENTITY_CONFIG } from "@/config/entities";
import { getImageUrl } from "@/lib/images/image-url";
import { buildFormData } from "@/lib/forms/buildFormData";

import {
  competitionFormSchema,
  CompetitionFormValues,
} from "@/lib/validations/competitions/competition-form.schema";

interface UseCompetitionFormOptions {
  competition?: CompetitionEditResponse;
  onSubmit: (payload: FormData) => void;
}

const createEmptyCompetitionForm = (): CompetitionFormValues => ({
  image: null,
  imageUrl: null,

  name: "",
  short_name: "",
  description: "",
  founded_year: 0,

  gender: "",
  age_group: "",
  participant_type: "",
  competition_category_id: "",

  competition_scope_id: "",
  confederation_id: null,
  nationality_id: null,
  region_id: null,
});

function mapCompetition(
  competition: CompetitionEditResponse,
): CompetitionFormValues {
  const {
    image,
    name,
    shortName,
    description,
    foundedYear,
    gender,
    ageGroup,
    participantType,
    competitionCategoryId,
    competitionScopeId,
    confederationId,
    nationalityId,
    regionId,
  } = competition;

  return {
    image: null,
    imageUrl: getImageUrl(
      "competition",
      ENTITY_CONFIG["competition"]["storageBucket"],
      image,
    ),

    name,
    short_name: shortName,
    description: description ?? "",
    founded_year: foundedYear,

    gender: gender as Gender,
    age_group: ageGroup as AgeGroup,
    participant_type: participantType as ParticipantType,
    competition_category_id: competitionCategoryId,

    competition_scope_id: competitionScopeId,
    confederation_id: confederationId,
    nationality_id: nationalityId,
    region_id: regionId,
  };
}

export function useCompetitionForm({
  competition,
  onSubmit,
}: UseCompetitionFormOptions) {
  const defaultValues = useMemo(
    () =>
      competition ? mapCompetition(competition) : createEmptyCompetitionForm(),
    [competition],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: competitionFormSchema,
      onChange: competitionFormSchema,
      onSubmit: competitionFormSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = buildFormData({
        values: {
          name: value.name,
          short_name: value.short_name,
          description: value.description,
          founded_year: value.founded_year,
          gender: value.gender,
          age_group: value.age_group,
          participant_type: value.participant_type,
          competition_category_id: value.competition_category_id,
          competition_scope_id: value.competition_scope_id,
          confederation_id: value.confederation_id,
          nationality_id: value.nationality_id,
          region_id: value.region_id,
        },
        existingImage: value.imageUrl,
        imageFile: value.image,
      });

      onSubmit(payload);
    },
  });

  return form;
}

export type CompetitionForm = ReturnType<typeof useCompetitionForm>;
