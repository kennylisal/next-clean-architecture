import { IDomainRepository } from "@/application/repositories/domain.repository.interface";
import { CreateDomain, Domain, DomainHeader } from "@/entities/models/domain";
import knex, { Knex } from "knex";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";

export class DomainsSQLRepositories implements IDomainRepository {
  async createDomain(
    domain: CreateDomain,
    trx?: Knex.Transaction
  ): Promise<number> {
    const db = trx || knexDB;
    const query = db("domains").insert(domain).returning("domain_id");
    const result: { domain_id: number }[] = await executeQuery(
      query,
      "INSERT",
      "DOMAINS"
    );
    return Number(result[0].domain_id);
  }
  async getDomainDetail(
    domainId: number,
    trx?: Knex.Transaction
  ): Promise<Domain> {
    const db = trx || knexDB;
    const query = db("domains")
      .select("*")
      .where("domain_id", "=", domainId)
      .first();
    return await executeQuery(query, "SELECT", "DOMAINS");
  }
}
