import { access_type_admin, access_type_statistics, access_type_read_only } from "translations";
import type { AccessType } from "~/types/database.enums";

export const memberTypeTranslation = (type: AccessType) => {
  switch (type) {
    case "admin":
      return access_type_admin();
    case "statistics":
      return access_type_statistics();
    default:
      return access_type_read_only();
  }
};
