"use client";

import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { buildFormData } from "@/lib/forms/buildFormData";
import {
  CompetitionEditResponse,
  UpsertCompetitionInput,
} from "@/types/competition";
import { ParticipantType } from "@/enums/ParticipantType";
import { Gender } from "@/enums/Gender";
import { AgeGroup } from "@/enums/AgeGroup";

const emptyCompetitionForm: UpsertCompetitionInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

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
};

function mapCompetition(
  competition: CompetitionEditResponse,
): UpsertCompetitionInput {
  const {
    id,
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
    id,

    image,
    imageUrl: getImageUrl(
      "competition",
      STORAGE_BUCKETS.COMPETITIONS,
      image,
    ),
    imageFile: null,
    previewUrl: null,

    name,
    short_name: shortName,
    description: description ?? null,
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

export function useCompetitionForm(competition?: CompetitionEditResponse) {
  const initialValue = useMemo(
    () => (competition ? mapCompetition(competition) : emptyCompetitionForm),
    [competition],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = competition != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 &&
      form.short_name.trim().length > 0 &&
      form.founded_year >= 1800 &&
      form.gender.trim().length > 0 &&
      form.age_group.trim().length > 0 &&
      form.participant_type.trim().length > 0 &&
      form.competition_category_id.trim().length > 0 &&
      form.competition_scope_id.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.short_name !== initialForm.short_name ||
      form.description !== initialForm.description ||
      form.founded_year !== initialForm.founded_year ||
      form.gender !== initialForm.gender ||
      form.age_group !== initialForm.age_group ||
      form.participant_type !== initialForm.participant_type ||
      form.competition_category_id !== initialForm.competition_category_id ||
      form.competition_scope_id !== initialForm.competition_scope_id ||
      form.confederation_id !== initialForm.confederation_id ||
      form.nationality_id !== initialForm.nationality_id ||
      form.region_id !== initialForm.region_id ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        short_name: form.short_name,
        description: form.description,
        founded_year: form.founded_year,
        gender: form.gender,
        age_group: form.age_group,
        participant_type: form.participant_type,
        competition_category_id: form.competition_category_id,
        competition_scope_id: form.competition_scope_id,
        confederation_id: form.confederation_id,
        nationality_id: form.nationality_id,
        region_id: form.region_id,
      },
      existingImage: form.image,
      imageFile: form.imageFile,
    });
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
