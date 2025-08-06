import z from "zod";

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
