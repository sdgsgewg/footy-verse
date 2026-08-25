"use client";

import { useMemo } from "react";
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
import { useEntityForm, useImageField } from "@/hooks/crud";
import { competitionMutationSchema } from "@/lib/validations/competitions.schema";

const createEmptyCompetitionForm = (): UpsertCompetitionInput => ({
  id: "",

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
    imageUrl: getImageUrl("competition", STORAGE_BUCKETS.COMPETITIONS, image),

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
    () =>
      competition ? mapCompetition(competition) : createEmptyCompetitionForm(),
    [competition],
  );

  const {
    imageFile,
    previewUrl,
    updateImage: setImage,
  } = useImageField({
    initialPreviewUrl: initialValue.imageUrl,
  });

  const {
    form,
    updateField,
    errors,
    isDirty,
    canSubmit,
    validate,
    clearFieldError,
  } = useEntityForm({
    initialValue,
    schema: competitionMutationSchema,

    dirtyFields: [
      "name",
      "short_name",
      "description",
      "founded_year",
      "gender",
      "age_group",
      "participant_type",
      "competition_category_id",
      "competition_scope_id",
      "confederation_id",
      "nationality_id",
      "region_id",
      "image",
    ],

    requiredFields: [
      "name",
      "short_name",
      "founded_year",
      "gender",
      "age_group",
      "participant_type",
      "competition_category_id",
      "competition_scope_id",
    ],

    additionalDirty: imageFile !== null,
  });

  const updateImage = (file: File) => {
    setImage(file);
    clearFieldError("image");
  };

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
      imageFile,
    });
  };

  return {
    form: {
      ...form,

      imageFile,
      previewUrl,
    },

    isDirty,
    errors,

    updateField,
    updateImage,

    validate,
    canSubmit,
    buildPayload,
  };
}
