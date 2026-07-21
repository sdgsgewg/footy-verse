import { useTranslations } from "next-intl";
import PageLoading from "./PageLoading";
import { Entity } from "@/config/entities";

interface Props {
  entity: Entity;
}

export default function EntityNotFound({ entity }: Props) {
  const tCommon = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  return (
    <PageLoading
      message={tCommon("notFoundEntity", {
        entity: tEntities(entity),
      })}
    />
  );
}
