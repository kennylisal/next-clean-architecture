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
  membership_status: z.string(),
  member_role: z.string(),
});

export type CreateDomainMembership = z.infer<
  typeof createDomainMembershipSchema
>;
