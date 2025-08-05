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
});

export type CreateDomain = z.infer<typeof createDomainSchema>;

export interface DomainHeader {
  domain_name: string;
  description: string;
  created_at: string;
  jumlah_anggota: number;
}
