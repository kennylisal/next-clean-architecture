import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import {
  DomainMembership,
  CreateDomainMembership,
} from "@/entities/models/domain-membership";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";

export class DomainsMembershipSQLRepositories
  implements IDomainMembershipRepository
{
  async getDomainMemberStatus(
    member_id: string,
    domain_id: number
  ): Promise<DomainMembership | undefined> {
    const query = knexDB("domains_membership")
      .where({
        member_id: member_id,
        domain_id: domain_id,
      })
      .first();
    return await executeQuery(query, "READ", "domains_membership");
  }
  async getDomainMemberCount(domainId: number): Promise<number> {
    const query = knexDB("domains_membership")
      .where("domain_id", "=", domainId)
      .count("* as count");
    const result = (await executeQuery(
      query,
      "READ",
      "domains_membership"
    )) as [{ count: number }];

    return Number(result[0].count);
  }
  async createDomainMembership(
    schema: CreateDomainMembership
  ): Promise<number> {
    const query = knexDB("domains_membership")
      .insert(schema)
      .returning("membership_id");

    const result: { membership_id: number }[] = await executeQuery(
      query,
      "INSERT",
      "domains_membership"
    );
    return Number(result[0].membership_id);
  }
  async getMembershipDetail(membershipId: number): Promise<DomainMembership> {
    const query = knexDB("domains_membership")
      .where("membership_id", "=", membershipId)
      .first();
    return await executeQuery(query, "INSERT", "domains_memebrhsip");
  }
  async getUserMemberships(userId: string): Promise<DomainMembership[]> {
    const query = knexDB("domains_membership").where("member_id", "=", userId);
    return await executeQuery(query, "INSERT", "domains_membership");
  }
}
