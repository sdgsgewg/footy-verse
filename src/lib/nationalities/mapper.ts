import {
  DbNationalityDetailRow,
  DbNationalityListRow,
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityListItem,
} from "@/types/nationality";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";

export function mapNationalityListItem(
  nationality: DbNationalityListRow,
): NationalityListItem {
  const { id, image, name, slug } = nationality;

  return {
    id,
    image,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,
    slug,
  };
}

export function mapNationalityEditResponse(
  nationality: DbNationalityDetailRow,
): NationalityEditResponse {
  const { id, image, name } = nationality;

  return {
    id,
    image,
    name,
  };
}

export function mapNationalityDetailResponse(
  nationality: DbNationalityDetailRow,
): NationalityDetailResponse {
  const { id, image, name } = nationality;

  return {
    id,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,
  };
}
