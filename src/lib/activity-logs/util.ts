import { ENTITY_CONFIG, Entity } from "@/config/entities";
import { ActivityLogAction } from "@/enums/ActivityLogAction";

interface ActivityLogMessage {
  title: string;
  description: string;
}

interface ActivityLogMessageOptions {
  entity: Entity;
  action: ActivityLogAction;
  name?: string;
}

export function generateActivityLogMessage({
  entity,
  action,
  name,
}: ActivityLogMessageOptions): ActivityLogMessage {
  const label = ENTITY_CONFIG[entity].label;
  const lowercaseLabel = label.toLowerCase();

  switch (action) {
    case ActivityLogAction.CREATE:
      return {
        title: name ? `${name} added` : `New ${lowercaseLabel} added`,
        description: name
          ? `${name} was added to the database.`
          : `A new ${lowercaseLabel} was added to the database.`,
      };

    case ActivityLogAction.UPDATE:
      return {
        title: name ? `${name} updated` : `${label} information updated`,
        description: name
          ? `${name} information was updated.`
          : `${label} information was updated.`,
      };

    case ActivityLogAction.DELETE:
      return {
        title: name ? `${name} deleted` : `${label} deleted`,
        description: name
          ? `${name} was removed from the database.`
          : `${label} was removed from the database.`,
      };
  }
}
