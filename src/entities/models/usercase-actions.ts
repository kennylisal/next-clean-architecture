export enum USE_CASE_ACTIONS {
  READ = "read",
  UPDATE = "update",
  CREATE = "create",
  DELETE = "delete",
}

export enum RESOURCE {
  POST = "posts",
  DOMAIN = "domains",
  DOMAIN_MEMBERSHIPS = "domains_membership",
}

export interface UseCaseAction {
  action: USE_CASE_ACTIONS;
  resource: RESOURCE;
}

export const forbiddenActionMessage = (
  action: UseCaseAction,
  idDokumen: number
): string => {
  return `{Akses ${action.action} terhadap ${action.resource} tidak diperbolehkan}`;
};
