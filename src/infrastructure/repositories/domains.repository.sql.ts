import { IDomainsRepository } from "@/application/repositories/domain.repository.interface";
import { CreateDomain, Domain, DomainHeader } from "@/entities/models/domain";
import { Knex } from "knex";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";
import { PSQLTransaction } from "../services/transaction-manager.service.psql";

export class DomainsSQLRepositories implements IDomainsRepository {
  async isDomainNameTaken(
    domainName: string,
    trx?: Knex.Transaction
  ): Promise<boolean> {
    const db = trx || knexDB;
    const query = db("domains")
      .count({ count: "*" })
      .where("domain_name", domainName)
      .first();
    return Number(await executeQuery(query, "READ", "domains")) > 0;
  }
  async createDomain(
    domain: CreateDomain,
    trx?: PSQLTransaction
  ): Promise<number> {
    const db = trx?.trxInstance || knexDB;
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

  async getAllDomainName(): Promise<{ domain_name: string }[]> {
    const query = knexDB("domains").select("domain_name");
    const res = executeQuery(query, "READ", "domains");
    return res as unknown as {
      domain_name: string;
    }[];
  }
}
