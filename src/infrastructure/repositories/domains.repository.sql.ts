import { IDomainRepository } from "@/application/repositories/domain.repository.interface";
import { CreateDomain, Domain, DomainHeader } from "@/entities/models/domain";
import knex from "knex";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";

export class DomainsSQLRepositories implements IDomainRepository {
  async createDomain(domain: CreateDomain): Promise<number> {
    const query = knexDB("domains").insert(domain).returning("domain_id");
    const result: { domain_id: number }[] = await executeQuery(
      query,
      "INSERT",
      "DOMAINS"
    );
    return result[0].domain_id;
  }
  async getDomainDetail(domainId: number): Promise<Domain> {
    const query = knexDB("domains")
      .select("*")
      .where("domain_id", "=", domainId)
      .first();
    return await executeQuery(query, "SELECT", "DOMAINS");
  }
}
