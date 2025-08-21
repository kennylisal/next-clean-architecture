import z from "zod";
import { InvalidDomainMembershipRoleError } from "../error/common";

export interface DomainMembership {
  membership_id: number;
  member_id: string;
  domain_id: string;
  created_at: string;
  membership_status: string;
  member_role: string;
}

//ini skema dipakai di controller
//dia punya interface dipake untuk repo
export const createDomainMembershipSchema = z.object({
  member_id: z.string(),
  domain_id: z.number(),
  membership_status: z.enum(["active", "banned", "expired", "suspended"]),
  member_role: z.enum(["member", "moderator", "admin", "creator"]),
});

export type CreateDomainMembership = z.infer<
  typeof createDomainMembershipSchema
>;

export enum DOMAIN_MEMBERSHIP_ROLE {
  MEMBER = "member",
  MODERATOR = "moderator",
  ADMIN = "admin",
  CREATOR = "creator",
}

export function toDomainMembershipRole(value: string): DOMAIN_MEMBERSHIP_ROLE {
  if (
    Object.values(DOMAIN_MEMBERSHIP_ROLE).includes(
      value as DOMAIN_MEMBERSHIP_ROLE
    )
  ) {
    return value as DOMAIN_MEMBERSHIP_ROLE;
  }
  throw new InvalidDomainMembershipRoleError(`Invalid role: ${value}`);
}
