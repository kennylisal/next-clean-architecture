import { IDomainsRepository } from "@/application/repositories/domain.repository.interface";
import { CreateDomain, Domain } from "@/entities/models/domain";
import { Knex } from "knex";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";
import { PSQLTransaction } from "../services/transaction-manager.service.psql";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ICrashResporterServices } from "@/application/services/crash-reporter.service.interface";

export class DomainsSQLRepositories implements IDomainsRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashResporterServices
  ) {}
  async isDomainNameTaken(
    domainName: string,
    trx?: Knex.Transaction
  ): Promise<boolean> {
    return await this.instrumentationService.startSpan(
      { name: "domains repository > isDomainNameTaken" },
      async () => {
        const db = trx || knexDB;
        const query = db("domains")
          .count({ count: "*" })
          .where("domain_name", domainName)
          .first();
        return (
          Number(
            await executeQuery(
              query,
              "READ",
              "domains",
              this.crashReporterService
            )
          ) > 0
        );
      }
    );
  }
  async createDomain(
    domain: CreateDomain,
    trx?: PSQLTransaction
  ): Promise<number> {
    return this.instrumentationService.startSpan(
      { name: "domain repository > createDomain" },
      async () => {
        const db = trx?.trxInstance || knexDB;
        const query = db("domains").insert(domain).returning("domain_id");
        const result: { domain_id: number }[] = await executeQuery(
          query,
          "INSERT",
          "DOMAINS",
          this.crashReporterService
        );
        return Number(result[0].domain_id);
      }
    );
  }
  async getDomainDetail(
    domainId: number,
    trx?: Knex.Transaction
  ): Promise<Domain> {
    return this.instrumentationService.startSpan(
      { name: "domain repository > getDomainDetail" },
      async () => {
        const db = trx || knexDB;
        const query = db("domains")
          .select("*")
          .where("domain_id", "=", domainId)
          .first();
        return await executeQuery(
          query,
          "SELECT",
          "DOMAINS",
          this.crashReporterService
        );
      }
    );
  }

  async getAllDomainName(): Promise<
    { domain_name: string; domain_id: number }[]
  > {
    return this.instrumentationService.startSpan(
      { name: "domain repository > getAllDomainName" },
      async () => {
        const query = knexDB("domains").select("domain_name", "domain_id");
        const res = await executeQuery(
          query,
          "READ",
          "domains",
          this.crashReporterService
        );
        return res as unknown as { domain_name: string; domain_id: number }[];
      }
    );
  }
}
