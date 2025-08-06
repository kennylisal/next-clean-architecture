import z from "zod";

export interface Domain {
  domain_name: string;
  domain_id: number;
  description: string;
  created_at: string;
  domain_visibility: string;
}

export const createDomainSchema = z.object({
  domain_name: z.string().min(5),
  domain_visibility: z.enum(["public", "restricted", "private"]),
  description: z.string(),
  domain_id: z.number().optional(),
  membership_acceptance: z.enum(["open", "invite-only", "confirmation"]),
  domain_status: z.enum(["active", "banned", "expired", "suspended"]),
});

export type CreateDomain = z.infer<typeof createDomainSchema>;

export interface DomainHeader {
  domain_name: string;
  description: string;
  created_at: string;
  jumlah_anggota: number;
}
