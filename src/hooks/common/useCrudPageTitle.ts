// src/hooks/common/useCrudPageTitle.ts

import { Entity } from "@/config/entities";
import { CrudAction } from "@/types/crud";
import { useTranslations } from "next-intl";

export function useCrudPageTitle() {
  const tPages = useTranslations("common.pages");
  const tEntities = useTranslations("entities");

  function getTitle(
    action: "list" | Exclude<CrudAction, "delete">,
    entity: Entity,
    entityName = "",
  ) {
    return tPages(`${action}.title`, {
      entity: tEntities(entity),
      entityName,
    });
  }

  function getSubtitle(
    action: "list" | Exclude<CrudAction, "delete">,
    entity: Entity,
  ) {
    return tPages(`${action}.subtitle`, {
      entity: tEntities(entity),
    });
  }

  return {
    getTitle,
    getSubtitle,
  };
}
